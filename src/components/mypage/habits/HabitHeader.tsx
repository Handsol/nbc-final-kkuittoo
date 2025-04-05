type HabitHeaderProps = {
  habitsLength: number;
};

const HabitHeader = ({ habitsLength }: HabitHeaderProps) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <h1 className="text-xl font-bold text-gray-800">HABITS</h1>
      <span className="text-sm text-gray-500">({habitsLength}/10)</span>
    </div>
  );
};

export default HabitHeader;
