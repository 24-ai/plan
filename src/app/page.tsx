import MondayMeals from './components/MondayMeals';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Weekly Meal Planner</h1>
      <MondayMeals />
    </main>
  );
}