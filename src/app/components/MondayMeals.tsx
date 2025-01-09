'use client';


import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, ChevronUp, Printer, Share2, Filter, Target } from 'lucide-react';

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
        

    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Monday&apos;s Detailed Meal Plan</h2>
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
          Daily total: {meals[meals.length - 1].runningPlantCount} unique plant foods
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
=======
