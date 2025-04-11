// import { prisma } from '@/lib/prisma';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';

// type RouteParams = {
//   params: {
//     id: string;
//   };
// };

// //단일 항목 조회
// export async function GET(request: Request, { params }: RouteParams) {
//   try {
//     const { id } = params;
//     const todo = await prisma.user.findUnique({
//       where: { id },
//     });

//     if (!todo) {
//       return NextResponse.json(
//         { error: 'Todo 항목을 찾을 수 없습니다.' },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(todo);
//   } catch (error) {
//     console.error('Todo 조회 에러:', error);
//     return NextResponse.json(
//       { error: 'Todo 항목을 가져오는데 실패했습니다.' },
//       { status: 500 },
//     );
//   }
// }

// // 단일 항목 수정 (로그인 필요, 본인 항목만)
// export async function PATCH(request: Request, { params }: RouteParams) {
//   const session = await getServerSession(authOptions);

//   // 인증되지 않은 사용자는 403 에러
//   if (!session || !session.user) {
//     return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
//   }

//   try {
//     const { id } = params;
//     const { title, content, isDone } = await request.json();

//     // 해당 Todo 항목이 존재하는지 확인
//     const todo = await prisma.todo.findUnique({
//       where: { id },
//     });

//     if (!todo) {
//       return NextResponse.json(
//         { error: 'Todo 항목을 찾을 수 없습니다.' },
//         { status: 404 },
//       );
//     }

//     // 사용자가 해당 Todo 항목의 소유자인지 확인
//     if (todo.userId && todo.userId !== session.user.id) {
//       return NextResponse.json(
//         { error: '이 Todo 항목을 수정할 권한이 없습니다.' },
//         { status: 403 },
//       );
//     }

//     const updatedTodo = await prisma.todo.update({
//       where: { id },
//       data: {
//         ...(title !== undefined && { title }),
//         ...(content !== undefined && { content }),
//         ...(isDone !== undefined && { isDone }),
//       },
//     });

//     return NextResponse.json(updatedTodo);
//   } catch (error) {
//     console.error('Todo 수정 에러:', error);
//     return NextResponse.json(
//       { error: 'Todo 항목 수정에 실패했습니다.' },
//       { status: 500 },
//     );
//   }
// }

// // 단일 항목 삭제 (로그인 필요, 본인 항목만)
// export async function DELETE(request: Request, { params }: RouteParams) {
//   const session = await getServerSession(authOptions);

//   // 인증되지 않은 사용자는 403 에러
//   if (!session || !session.user) {
//     return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
//   }

//   try {
//     const { id } = params;

//     // 해당 Todo 항목이 존재하는지 확인
//     const todo = await prisma.todo.findUnique({
//       where: { id },
//     });

//     if (!todo) {
//       return NextResponse.json(
//         { error: 'Todo 항목을 찾을 수 없습니다.' },
//         { status: 404 },
//       );
//     }

//     // 사용자가 해당 Todo 항목의 소유자인지 확인
//     if (todo.userId && todo.userId !== session.user.id) {
//       return NextResponse.json(
//         { error: '이 Todo 항목을 삭제할 권한이 없습니다.' },
//         { status: 403 },
//       );
//     }

//     await prisma.todo.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: 'Todo 항목이 삭제되었습니다.' });
//   } catch (error) {
//     console.error('Todo 삭제 에러:', error);
//     return NextResponse.json(
//       { error: 'Todo 항목 삭제에 실패했습니다.' },
//       { status: 500 },
//     );
//   }
// }
