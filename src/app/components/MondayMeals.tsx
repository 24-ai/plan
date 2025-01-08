'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const meals = [
  {
    time: '7:00',
    meal: 'Wake Up',
    description: 'English Breakfast tea with milk',
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1,
    ingredients: ['Black tea', 'Milk']
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    description: 'Banana-berry overnight oats with chia and almond butter',
    calories: 430,
    protein: 12,
    carbs: 65,
    fats: 18,
    ingredients: ['Oats', 'Banana', 'Raspberries', 'Blueberries', 'Chia seeds', 'Almonds']
  }
];

const MondayMeals = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Monday&apos;s Meal Plan</h2>
      
      <div className="mb-8 h-64">
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

      <div className="space-y-6">
        {meals.map((meal, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{meal.time} - {meal.meal}</h3>
                <p className="text-gray-600 mt-1">{meal.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{meal.calories} calories</p>
                <p className="text-sm">P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold">Ingredients:</p>
              <p className="text-sm text-gray-600">{meal.ingredients.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MondayMeals;