'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const meals = [
  {
    time: '7:00',
    meal: 'Wake Up',
    description: 'English Breakfast tea with milk',
    ingredients: ['Black tea', 'Milk'],
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    description: 'Banana-berry overnight oats with chia and almond butter',
    ingredients: ['Oats', 'Banana', 'Raspberries', 'Blueberries', 'Chia seeds', 'Almonds', 'Almond milk'],
    calories: 430,
    protein: 12,
    carbs: 65,
    fats: 18
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    description: 'Apple with almonds and dark chocolate square',
    ingredients: ['Apple', 'Almonds', 'Dark chocolate'],
    calories: 195,
    protein: 6,
    carbs: 22,
    fats: 12
  },
  {
    time: '13:00',
    meal: 'Lunch',
    description: 'Rainbow Buddha Bowl',
    ingredients: ['Quinoa', 'Chickpeas', 'Spinach', 'Carrots', 'Red cabbage', 'Avocado', 'Tahini dressing'],
    calories: 520,
    protein: 18,
    carbs: 68,
    fats: 24
  },
  {
    time: '15:30',
    meal: 'Pre-dinner Snack',
    description: 'Orange and sugar snap peas with tea and milk',
    ingredients: ['Orange', 'Sugar snap peas', 'Black tea', 'Milk'],
    calories: 115,
    protein: 3,
    carbs: 24,
    fats: 2
  },
  {
    time: '17:00',
    meal: 'Dinner',
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
    calories: 630,
    protein: 45,
    carbs: 68,
    fats: 28
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    description: 'Greek yogurt with pomegranate and dark chocolate',
    ingredients: ['Greek yogurt', 'Pomegranate seeds', 'Dark chocolate'],
    calories: 160,
    protein: 12,
    carbs: 16,
    fats: 8
  }
];

const MondayMeals = () => {
  const totalNutrition = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8">Monday&apos;s Detailed Meal Plan</h2>
      
      {/* Calorie Distribution Chart */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Calorie Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={meals}>
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

      {/* Meal Cards */}
      <div className="space-y-6 mb-8">
        {meals.map((meal, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-500">{meal.time}</span>
                  <h3 className="text-xl font-bold">{meal.meal}</h3>
                </div>
                <p className="text-gray-700 mb-3">{meal.description}</p>
                <div className="mb-3">
                  <h4 className="font-semibold mb-1">Ingredients:</h4>
                  <p className="text-gray-600">{meal.ingredients.join(', ')}</p>
                </div>
              </div>
              <div className="ml-6 text-right">
                <p className="text-2xl font-bold text-purple-600">{meal.calories} cal</p>
                <div className="text-sm text-gray-600 mt-1">
                  <p>Protein: {meal.protein}g</p>
                  <p>Carbs: {meal.carbs}g</p>
                  <p>Fats: {meal.fats}g</p>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default MondayMeals;