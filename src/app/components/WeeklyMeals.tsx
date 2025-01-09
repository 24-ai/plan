'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, ChevronUp, Printer, Share2, Filter, Target } from 'lucide-react';

// Move the Monday meals data here
const mondayMeals = [/* Your existing Monday meals data */];
const meals = [
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
];
// Add Tuesday meals data
const tuesdayMeals = [
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
    description: 'Tofu scramble on sourdough',
    ingredients: ['Tofu', 'Sourdough bread', 'Mushrooms', 'Kale', 'Turmeric', 'Onions'],
    plantFoods: ['Tofu', 'Sourdough', 'Mushrooms', 'Kale', 'Turmeric', 'Onions'],
    runningPlantCount: 7,
    calories: 420,
    protein: 24,
    carbs: 52,
    fats: 16
  },
  // Add rest of Tuesday meals...
];

const WeeklyMeals = () => {
  // Add tab state
  const [activeDay, setActiveDay] = useState('monday');
  
  // Your existing state management
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string>('All');
  const [showNutritionalGoals, setShowNutritionalGoals] = useState(false);

  // Get current meals based on active day
  const meals = activeDay === 'monday' ? mondayMeals : tuesdayMeals;
  
  // Rest of your existing code remains the same, but will now use the dynamic 'meals' variable

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Add Tabs */}
      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setActiveDay('monday')}
          className={`px-4 py-2 rounded-t-lg ${
            activeDay === 'monday' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Monday
        </button>
        <button 
          onClick={() => setActiveDay('tuesday')}
          className={`px-4 py-2 rounded-t-lg ${
            activeDay === 'tuesday' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Tuesday
        </button>
      </div>

      {/* Your existing header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{activeDay.charAt(0).toUpperCase() + activeDay.slice(1)}&apos;s Detailed Meal Plan</h2>
        {/* Rest of your existing header content */}
      </div>

      {/* Rest of your existing component content */}
    </div>
  );
};

export default WeeklyMeals;