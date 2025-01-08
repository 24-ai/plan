'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, Printer, Share2, Filter, Target } from 'lucide-react';

const meals = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
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
    type: 'Breakfast',
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
    type: 'Snack',
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
    type: 'Lunch',
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
    type: 'Snack',
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
    calories: 160,
    protein: 12,
    carbs: 16,
    fats: 8
  }
];

const MondayMeals = () => {
  // State management
  const [expandedMeal, setExpandedMeal