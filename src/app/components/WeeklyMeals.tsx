'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, ChevronUp, Printer, Share2, Filter, Target } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const mondayMeals = [
  // Your existing Monday meals data here
];

const WeeklyMeals = () => {
  const [activeDay, setActiveDay] = useState('Monday');
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string>('All');
  const [showNutritionalGoals, setShowNutritionalGoals] = useState(false);
  
  // Daily goals
  const nutritionalGoals = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fats: 65
  };

  // Get current meals based on active day
  const currentMeals = mondayMeals; // We'll expand this later for other days
// Daily goals
const nutritionalGoals = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fats: 65
  };

  // Calculate totals
  const totalNutrition = currentMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Filter meals
  const filteredMeals = selectedMealType === 'All' 
    ? currentMeals 
    : currentMeals.filter(meal => meal.type === selectedMealType);

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle share
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
  // Calculate totals
  const totalNutrition = currentMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  // Filter meals
  const filteredMeals = selectedMealType === 'All' 
    ? currentMeals 
    : currentMeals.filter(meal => meal.type === selectedMealType);

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Day Selection Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeDay === day 
                ? 'bg-purple-600 text-white' 
                : 'hover:bg-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
{/* Page Header */}
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

      {/* Filters and Goals */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-4">
          <Filter size={20} />
          <select 
            value={selectedMealType}
            onChange={(e) => setSelectedMealType(e.target.value)}
            className="border rounded-md p-2"
          >
            {mealTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => setShowNutritionalGoals(!showNutritionalGoals)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-lg hover:bg-purple-200"
        >
          <Target size={20} />
          <span>Goals</span>
        </button>
      </div>

      {/* Nutritional Goals */}
      {showNutritionalGoals && (
        <div className="mb-6 bg-purple-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Daily Goals Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(nutritionalGoals).map(([key, goal]) => {
              const current = totalNutrition[key as keyof typeof totalNutrition];
              const percentage = Math.round((current / goal) * 100);
              return (
                <div key={key} className="bg-white p-4 rounded-lg">
                  <p className="text-gray-600 capitalize">{key}</p>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm">
                    {current} / {goal} ({percentage}%)
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calorie Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Calorie Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredMeals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded shadow">
                        <p className="font-bold">{data.time} - {data.meal}</p>
                        <p className="text-sm">{data.description}</p>
                        <p>Calories: {data.calories}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="calories" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Plant Foods Accumulation Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Plant Foods Accumulation</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredMeals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border border-gray-200 rounded shadow">
                        <p className="font-bold">{data.time} - {data.meal}</p>
                        <p className="text-sm">New plant foods: {data.plantFoods.join(', ')}</p>
                        <p>Total unique plant foods: {data.runningPlantCount}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="stepAfter" 
                dataKey="runningPlantCount" 
                stroke="#4CAF50" 
                strokeWidth={2} 
                dot={{ fill: '#4CAF50' }} 
                name="Unique Plant Foods"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Current total: {currentMeals.length > 0 ? currentMeals[currentMeals.length - 1].runningPlantCount : 0} unique plant foods
        </p>
      </div>

      {/* Meal Cards */}
      <div className="space-y-6 mb-8">
        {filteredMeals.map((meal, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            onClick={() => setExpandedMeal(expandedMeal === index ? null : index)}
          >
            <div className="flex justify-between items-start cursor-pointer">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-500">{meal.time}</span>
                  <h3 className="text-xl font-bold">{meal.meal}</h3>
                  {expandedMeal === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                <p className="text-gray-700">{meal.description}</p>
              </div>
              <div className="ml-6 text-right">
                <p className="text-2xl font-bold text-purple-600">{meal.calories} cal</p>
              </div>
            </div>
            
            {expandedMeal === index && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Ingredients:</h4>
                    <ul className="list-disc pl-4 space-y-1">
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx} className="text-gray-600">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Nutrition Facts:</h4>
                    <div className="space-y-2">
                      <p className="text-gray-600">Protein: {meal.protein}g</p>
                      <p className="text-gray-600">Carbs: {meal.carbs}g</p>
                      <p className="text-gray-600">Fats: {meal.fats}g</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Daily Totals */}
      <div className="bg-purple-50 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Daily Totals</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Total Calories</p>
            <p className="text-2xl font-bold">{totalNutrition.calories}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Total Protein</p>
            <p className="text-2xl font-bold">{totalNutrition.protein}g</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Total Carbs</p>
            <p className="text-2xl font-bold">{totalNutrition.carbs}g</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-gray-600">Total Fats</p>
            <p className="text-2xl font-bold">{totalNutrition.fats}g</p>
          </div>
        </div>
      </div>
      {/* Rest of your existing component content */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">{activeDay}&apos;s Detailed Meal Plan</h2>
        {/* ... rest of your existing code ... */}
      </div>

      {/* Keep all your existing sections here */}
    </div>
  );
};

export default WeeklyMeals;