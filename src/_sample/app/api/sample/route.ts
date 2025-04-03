// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';

// //모든 데이터 조회
// export const GET = async () => {
//   try {
//     const todos = await prisma.user.findMany({
//       orderBy: {
//         id: 'desc',
//       },
//     });

//     return NextResponse.json(todos);
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'user 목록을 가져오는데 실패했습니다.' },
//       { status: 500 },
//     );
//   }
// };

// //새 데이터 추가
// export const POST = async (request: Request) => {
//   const session = await getServerSession(authOptions);

//   // 인증되지 않은 사용자는 403 에러
//   if (!session || !session.user) {
//     return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
//   }

//   try {
//     const { title, content } = await request.json();

//     // 필수 필드 확인
//     if (!title || !content) {
//       return NextResponse.json(
//         { error: '제목과 내용은 필수입니다.' },
//         { status: 400 },
//       );
//     }

//     const user = await prisma.user.create({
//       data: {
//         title,
//         content,
//         userId: session.user.id,
//       },
//     });

//     return NextResponse.json(todo, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Todo 항목 생성에 실패했습니다.' },
//       { status: 500 },
//     );
//   }
// };
