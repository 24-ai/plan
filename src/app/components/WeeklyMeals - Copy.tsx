'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, ChevronUp, Printer, Share2, Filter, Target } from 'lucide-react';

interface Meal {
  time: string;
  meal: string;
  type: string;
  description: string;
  ingredients: string[];
  plantFoods: string[];
  runningPlantCount: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const mondayMeals: Meal[] = [

        {
          time: '7:00',
          meal: 'Wake Up',
          type: 'Breakfast',
          description: 'English Breakfast tea with milk',
          ingredients: ['Black tea', 'Milk'],
          plantFoods: ['Black tea'],
          runningPlantCount: 1,
          calories: 30,
          protein: 1,
          carbs: 4,
          fats: 1
        },
        {
          time: '7:30',
          meal: 'Breakfast',
          type: 'Breakfast',
          description: 'Banana-berry overnight oats with chia and almond butter',
          ingredients: ['Oats', 'Banana', 'Raspberries', 'Blueberries', 'Chia seeds', 'Almonds', 'Almond milk'],
          plantFoods: ['Oats', 'Banana', 'Raspberries', 'Blueberries', 'Chia seeds', 'Almonds'],
          runningPlantCount: 7,
          calories: 430,
          protein: 12,
          carbs: 65,
          fats: 18
        },
        {
          time: '10:30',
          meal: 'Morning Snack',
          type: 'Snack',
          description: 'Apple with almonds and dark chocolate square',
          ingredients: ['Apple', 'Almonds', 'Dark chocolate'],
          plantFoods: ['Apple', 'Cacao'],
          runningPlantCount: 9,
          calories: 195,
          protein: 6,
          carbs: 22,
          fats: 12
        },
        {
          time: '13:00',
          meal: 'Lunch',
          type: 'Lunch',
          description: 'Rainbow Buddha Bowl',
          ingredients: ['Quinoa', 'Chickpeas', 'Spinach', 'Carrots', 'Red cabbage', 'Avocado', 'Tahini dressing'],
          plantFoods: ['Quinoa', 'Chickpeas', 'Spinach', 'Carrots', 'Red cabbage', 'Avocado'],
          runningPlantCount: 15,
          calories: 520,
          protein: 18,
          carbs: 68,
          fats: 24
        },
        {
          time: '15:30',
          meal: 'Pre-dinner Snack',
          type: 'Snack',
          description: 'Orange and sugar snap peas with tea and milk',
          ingredients: ['Orange', 'Sugar snap peas', 'Black tea', 'Milk'],
          plantFoods: ['Orange', 'Sugar snap peas'],
          runningPlantCount: 17,
          calories: 115,
          protein: 3,
          carbs: 24,
          fats: 2
        },
        {
          time: '17:00',
          meal: 'Dinner',
          type: 'Dinner',
          description: 'Chicken Tinga Tacos',
          ingredients: [
            'Chicken breast',
            'Black beans',
            'Bell peppers',
            'Corn tortillas',
            'Tomatillos',
            'Cilantro',
            'Lime',
            'Jalapeno',
            'Chipotle peppers',
            'Onions'
          ],
          plantFoods: ['Black beans', 'Bell peppers', 'Corn', 'Tomatillos', 'Cilantro', 'Lime', 'Jalapeno', 'Chipotle peppers', 'Onions'],
          runningPlantCount: 26,
          calories: 630,
          protein: 45,
          carbs: 68,
          fats: 28
        },
        {
          time: '19:00',
          meal: 'Evening Snack',
          type: 'Snack',
          description: 'Greek yogurt with pomegranate and dark chocolate',
          ingredients: ['Greek yogurt', 'Pomegranate seeds', 'Dark chocolate'],
          plantFoods: ['Pomegranate', 'Cacao'],
          runningPlantCount: 28,
          calories: 160,
          protein: 12,
          carbs: 16,
          fats: 8
        }
      
      // ... your Monday meals data ...
];

const tuesdayMeals: Meal[] = [
  // ... your Tuesday meals data ...
];

const mealsByDay = {
  'Monday': mondayMeals,
  'Tuesday': tuesdayMeals,
  'Wednesday': [],
  'Thursday': [],
  'Friday': [],
  'Saturday': [],
  'Sunday': []
};

const WeeklyMeals: React.FC = () => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string>('All');
  const [showNutritionalGoals, setShowNutritionalGoals] = useState(false);

  const currentMeals = mealsByDay[activeDay as keyof typeof mealsByDay] || [];

  const nutritionalGoals = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fats: 65
  };

  const totalNutrition = currentMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const filteredMeals = selectedMealType === 'All' 
    ? currentMeals 
    : currentMeals.filter(meal => meal.type === selectedMealType);

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meal Plan',
          text: 'Check out my meal plan!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Day Selection */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg overflow-x-auto">
        {Object.keys(mealsByDay).map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors whitespace-nowrap ${
              activeDay === day 
                ? 'bg-purple-600 text-white' 
                : 'hover:bg-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{activeDay}&apos;s Detailed Meal Plan</h2>
        <div className="flex gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Printer size={20} />
            <span>Print</span>
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Rest of your JSX */}
    </div>
  );
};

export default WeeklyMeals;