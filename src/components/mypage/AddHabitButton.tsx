'use client';

const AddHabitButton = ({ userId }: { userId: string }) => {
  const handleAddHabit = async () => {
    console.log('모달');
  };

  return (
    <button
      className="px-8 py-1 bg-gray-700 text-white rounded-full"
      onClick={handleAddHabit}
    >
      Add
    </button>
  );
};

export default AddHabitButton;
