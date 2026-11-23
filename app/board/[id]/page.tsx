import TaskDetail from '@/components/TaskDetail';

export default function TaskPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <TaskDetail id={Number(params.id)} />
    </main>
  );
}
