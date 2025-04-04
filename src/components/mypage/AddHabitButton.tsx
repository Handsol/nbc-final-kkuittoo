'use client';

const AddHabitButton = ({ userId }: { userId: string }) => {
  const handleAddHabit = async () => {
    console.log('모달');
  };

  return (
    <button
      className="w-full py-2 bg-gray-700 text-white rounded-full"
      onClick={handleAddHabit}
    >
      Add Habit
    </button>
  );
};

export default AddHabitButton;
