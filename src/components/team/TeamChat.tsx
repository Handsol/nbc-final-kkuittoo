'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Pusher from 'pusher-js';

type TeamMessage = {
  id: string;
  messages: string;
  createdAt: string;
  users: {
    name: string | null;
    image: string | null;
  };
};

type TeamChatProps = {
  // 어떤 팀의 채팅인지 구분하기 위함
  teamId: string;
};
{
  /*
    messages: 지금까지 받은 모든 채팅 메시지를 저장하는 배열
    newMessage: 사용자가 입력중인 메시지
    data: session: 로그인한 사용자의 정보
    messagesEndRef: 새 메시지가 생기면 자동으로 아래로 스크롤하기 위해 사용됩니다.
  */
}
export const TeamChat = ({ teamId }: TeamChatProps) => {
  const [messages, setMessages] = useState<TeamMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  {
    /* 마지막 메시지로 스크롤이 부드럽게 이동 */
  }
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  {
    /* 메시지 불러오기 & Pusher 연결*/
  }
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // GET 요청을 보내서 teamId에 해당하는 메시지 가져오기
        const response = await fetch(`/api/chat?teamId=${teamId}`);
        if (response.ok) {
          const data = await response.json();
          // 요청 성공 시 setMessages에 상태를 저장하고 실패하면 에러 출력
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    // Pusher 설정
    // Pusher에 연결 후 .env에 저장된 키와 정보를 사용
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });
    // pusher.subscribe(teamId)
    // 여기서 teamId는 채팅방의 고유 번호니까, 각 팀 채팅방마다 다른 채널이 생기는 느낌
    // 비유하자면 pusher.subscribe('team-123')은 123채널로 라디오 주파수를 맞춘다
    const channel = pusher.subscribe(teamId);
    channel.bind('new-message', (message: TeamMessage) => {
      // new-message 이벤트가 발생하면(다른 누군가가 채팅을 보내면)
      // 메시지를 배열에 추가하고
      setMessages((prev) => [...prev, message]);
      // 스크롤을 맨 아래로 내린다
      scrollToBottom();
    });
    // Pusher 사용이 끝난 후 리소스 정리
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [teamId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 메시지가 비어있거나, 로그인이 안 된 경우 전송 금지
    if (!newMessage.trim() || !session?.user) return;
    // api/chat에 POST 요청 보내서 서버에 메시지 저장 & 실시간으로 다른 유저에게 전송
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessage,
          teamId,
        }),
      });

      if (response.ok) {
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <section className="flex-1 bg-neutral-400 rounded-3xl p-4">
      <p className="text-xl font-bold mb-4">Team Chat</p>
      <div className="flex flex-col h-96 bg-neutral-300 rounded-3xl">
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.users.name === session?.user?.name
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.users.name === session?.user?.name
                    ? 'bg-black text-white'
                    : 'bg-white'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.users.image && (
                    <Image
                      src={message.users.image}
                      alt={message.users.name || 'User'}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-semibold">{message.users.name}</span>
                </div>
                <p>{message.messages}</p>
                <span className="text-xs opacity-70">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-neutral-400 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              전송
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
