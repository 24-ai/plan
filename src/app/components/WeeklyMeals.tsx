'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ChevronDown, ChevronUp, Printer, Share2, Filter, Target, ChartBar, Sprout, Utensils } from 'lucide-react';


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
];

const tuesdayMeals: Meal[] = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
    description: 'English Breakfast tea with milk',
    ingredients: ['Black tea', 'Milk'],
    plantFoods: ['Black tea'],
    runningPlantCount: 29,
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
    ingredients: ['Tofu', 'Sourdough bread', 'Mushrooms', 'Kale', 'Turmeric'],
    plantFoods: ['Tofu', 'Sourdough bread', 'Mushrooms', 'Kale', 'Turmeric'],
    runningPlantCount: 34,
    calories: 420,
    protein: 24,
    carbs: 52,
    fats: 16
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    type: 'Snack',
    description: 'Mixed berries and nuts with dark chocolate',
    ingredients: ['Blackberries', 'Strawberries', 'Walnuts', 'Dark chocolate'],
    plantFoods: ['Blackberries', 'Strawberries', 'Walnuts'],
    runningPlantCount: 37,
    calories: 205,
    protein: 6,
    carbs: 20,
    fats: 14
  },
  {
    time: '13:00',
    meal: 'Lunch',
    type: 'Lunch',
    description: 'Mediterranean Grain Bowl',
    ingredients: ['Farro', 'Cucumber', 'Sun-dried tomatoes', 'Olives', 'Mint'],
    plantFoods: ['Farro', 'Cucumber', 'Sun-dried tomatoes', 'Olives', 'Mint'],
    runningPlantCount: 42,
    calories: 540,
    protein: 18,
    carbs: 72,
    fats: 24
  },
  {
    time: '15:30',
    meal: 'Tea Time',
    type: 'Snack',
    description: 'Tea with milk and dark chocolate',
    ingredients: ['Black tea', 'Milk', 'Dark chocolate'],
    plantFoods: [],
    runningPlantCount: 42,
    calories: 130,
    protein: 4,
    carbs: 10,
    fats: 9
  },
  {
    time: '17:00',
    meal: 'Dinner',
    type: 'Dinner',
    description: 'Loaded Jacket Potato with Chicken',
    ingredients: ['Russet potato', 'Chicken breast', 'Broccoli', 'Chives', 'Green onions'],
    plantFoods: ['Russet potato', 'Broccoli', 'Chives', 'Green onions'],
    runningPlantCount: 46,
    calories: 600,
    protein: 42,
    carbs: 52,
    fats: 28
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    type: 'Snack',
    description: 'Chamomile tea with fresh fruit',
    ingredients: ['Chamomile tea', 'Pear'],
    plantFoods: ['Chamomile', 'Pear'],
    runningPlantCount: 48,
    calories: 100,
    protein: 1,
    carbs: 24,
    fats: 0
  }
];
const wednesdayMeals: Meal[] = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
    description: 'English Breakfast tea with milk',
    ingredients: ['Black tea', 'Milk'],
    plantFoods: ['Black tea'],
    runningPlantCount: 49,
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    type: 'Breakfast',
    description: 'Protein smoothie bowl with dark chocolate nibs',
    ingredients: ['Mango', 'Dragon fruit', 'Hemp seeds', 'Coconut flakes', 'Cacao nibs', 'Plant protein'],
    plantFoods: ['Mango', 'Dragon fruit', 'Hemp seeds', 'Coconut', 'Cacao'],
    runningPlantCount: 54,
    calories: 450,
    protein: 25,
    carbs: 62,
    fats: 14
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    type: 'Snack',
    description: 'Crunchy vegetable sticks with tahini',
    ingredients: ['Radish', 'Jicama', 'Tahini'],
    plantFoods: ['Radish', 'Jicama', 'Tahini'],
    runningPlantCount: 57,
    calories: 160,
    protein: 5,
    carbs: 20,
    fats: 8
  },
  {
    time: '13:00',
    meal: 'Lunch',
    type: 'Lunch',
    description: 'Asian-inspired noodle bowl',
    ingredients: ['Buckwheat noodles', 'Edamame', 'Bok choy', 'Spring onions', 'Cilantro'],
    plantFoods: ['Buckwheat', 'Edamame', 'Bok choy', 'Spring onions', 'Cilantro'],
    runningPlantCount: 62,
    calories: 525,
    protein: 22,
    carbs: 70,
    fats: 22
  },
  {
    time: '15:30',
    meal: 'Tea Time',
    type: 'Snack',
    description: 'Trail mix with goji berries',
    ingredients: ['Brazil nuts', 'Goji berries', 'Black tea', 'Milk'],
    plantFoods: ['Brazil nuts', 'Goji berries'],
    runningPlantCount: 64,
    calories: 140,
    protein: 5,
    carbs: 12,
    fats: 9
  },
  {
    time: '17:00',
    meal: 'Dinner',
    type: 'Dinner',
    description: 'Baked chicken with ancient grains',
    ingredients: ['Chicken breast', 'Amaranth', 'Asparagus', 'Artichoke hearts', 'Thyme'],
    plantFoods: ['Amaranth', 'Asparagus', 'Artichoke', 'Thyme'],
    runningPlantCount: 68,
    calories: 580,
    protein: 44,
    carbs: 55,
    fats: 24
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    type: 'Snack',
    description: 'Spiced apple with dark chocolate',
    ingredients: ['Apple', 'Dark chocolate', 'Cardamom', 'Pecans'],
    plantFoods: ['Cardamom', 'Pecans'],
    runningPlantCount: 70,
    calories: 130,
    protein: 3,
    carbs: 20,
    fats: 7
  }
];
const thursdayMeals: Meal[] = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
    description: 'Fennel tea with milk',
    ingredients: ['Fennel tea', 'Milk'],
    plantFoods: ['Fennel'],
    runningPlantCount: 71,
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    type: 'Breakfast',
    description: 'Savory breakfast bowl with nori',
    ingredients: ['Millet', 'Collard greens', 'Japanese yam', 'Nori', 'Sesame seeds'],
    plantFoods: ['Millet', 'Collard greens', 'Japanese yam', 'Nori'],
    runningPlantCount: 75,
    calories: 440,
    protein: 24,
    carbs: 48,
    fats: 20
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    type: 'Snack',
    description: 'Fruit and seed mix with dark chocolate',
    ingredients: ['Passion fruit', 'Sunflower seeds', 'Dark chocolate'],
    plantFoods: ['Passion fruit', 'Sunflower seeds'],
    runningPlantCount: 77,
    calories: 185,
    protein: 6,
    carbs: 20,
    fats: 12
  },
  {
    time: '13:00',
    meal: 'Lunch',
    type: 'Lunch',
    description: 'Mediterranean Quinoa Bowl',
    ingredients: ['Quinoa', 'Cucumber', 'Cherry tomatoes', 'Watercress', 'Basil'],
    plantFoods: ['Quinoa', 'Cucumber', 'Cherry tomatoes', 'Watercress', 'Basil'],
    runningPlantCount: 82,
    calories: 510,
    protein: 22,
    carbs: 65,
    fats: 23
  },
  {
    time: '15:30',
    meal: 'Tea Time',
    type: 'Snack',
    description: 'Seaweed crisps with red pepper hummus',
    ingredients: ['Dulse seaweed', 'Red pepper hummus', 'Tea', 'Milk'],
    plantFoods: ['Dulse seaweed', 'Red peppers'],
    runningPlantCount: 84,
    calories: 130,
    protein: 4,
    carbs: 16,
    fats: 7
  },
  {
    time: '17:00',
    meal: 'Dinner',
    type: 'Dinner',
    description: 'Chicken Enchiladas Verdes',
    ingredients: [
      'Chicken breast',
      'Tomatillos',
      'Poblano peppers',
      'White onion',
      'Mexican oregano',
      'Corn tortillas',
      'Black beans',
      'Queso fresco'
    ],
    plantFoods: ['Tomatillos', 'Poblano peppers', 'White onion', 'Mexican oregano', 'Corn tortillas', 'Black beans'],
    runningPlantCount: 90,
    calories: 620,
    protein: 45,
    carbs: 58,
    fats: 26
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    type: 'Snack',
    description: 'Berry chia pudding with dark chocolate',
    ingredients: ['Mulberries', 'Chia seeds', 'Almond milk', 'Dark chocolate'],
    plantFoods: ['Mulberries'],
    runningPlantCount: 91,
    calories: 140,
    protein: 4,
    carbs: 20,
    fats: 7
  }
];
const fridayMeals: Meal[] = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
    description: 'Dandelion tea with milk',
    ingredients: ['Dandelion root tea', 'Milk'],
    plantFoods: ['Dandelion root'],
    runningPlantCount: 92,
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    type: 'Breakfast',
    description: 'Green protein smoothie bowl',
    ingredients: ['Spirulina', 'Kiwi', 'Moringa powder', 'Macadamia nuts', 'Plant protein'],
    plantFoods: ['Spirulina', 'Kiwi', 'Moringa', 'Macadamia nuts'],
    runningPlantCount: 96,
    calories: 460,
    protein: 28,
    carbs: 54,
    fats: 18
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    type: 'Snack',
    description: 'Root vegetable chips',
    ingredients: ['Lotus root', 'Burdock root', 'Olive oil', 'Sea salt'],
    plantFoods: ['Lotus root', 'Burdock root'],
    runningPlantCount: 98,
    calories: 155,
    protein: 3,
    carbs: 22,
    fats: 7
  },
  {
    time: '13:00',
    meal: 'Lunch',
    type: 'Lunch',
    description: 'Persian-inspired bowl',
    ingredients: ['Freekeh', 'Purslane', 'Persian cucumber', 'Sumac', 'Barberries'],
    plantFoods: ['Freekeh', 'Purslane', 'Persian cucumber', 'Sumac', 'Barberries'],
    runningPlantCount: 103,
    calories: 530,
    protein: 20,
    carbs: 68,
    fats: 24
  },
  {
    time: '15:30',
    meal: 'Tea Time',
    type: 'Snack',
    description: 'Fruit leather with nuts',
    ingredients: ['Fig paste', 'Pine nuts', 'Tea', 'Milk'],
    plantFoods: ['Fig', 'Pine nuts'],
    runningPlantCount: 105,
    calories: 125,
    protein: 4,
    carbs: 16,
    fats: 8
  },
  {
    time: '17:00',
    meal: 'Dinner',
    type: 'Dinner',
    description: 'Herb-crusted chicken',
    ingredients: ['Chicken breast', 'Wild rice', 'Kohlrabi', 'Mizuna', 'Tarragon'],
    plantFoods: ['Wild rice', 'Kohlrabi', 'Mizuna', 'Tarragon'],
    runningPlantCount: 109,
    calories: 590,
    protein: 42,
    carbs: 52,
    fats: 28
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    type: 'Snack',
    description: 'Herbal nightcap with dark chocolate',
    ingredients: ['Rooibos tea', 'Golden berries', 'Dark chocolate'],
    plantFoods: ['Rooibos', 'Golden berries'],
    runningPlantCount: 111,
    calories: 100,
    protein: 2,
    carbs: 22,
    fats: 2
  }
];
const saturdayMeals: Meal[] = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
    description: 'Fresh mint tea with milk',
    ingredients: ['Fresh mint', 'Milk'],
    plantFoods: ['Fresh mint'],
    runningPlantCount: 112,
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    type: 'Breakfast',
    description: 'Ancient grain porridge with cacao',
    ingredients: ['Teff', 'Longan fruit', 'Cacao nibs', 'Almond milk', 'Honey'],
    plantFoods: ['Teff', 'Longan fruit', 'Cacao'],
    runningPlantCount: 115,
    calories: 445,
    protein: 18,
    carbs: 64,
    fats: 16
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    type: 'Snack',
    description: 'Green smoothie',
    ingredients: ['Wheatgrass', 'Key lime', 'Coconut water', 'Apple'],
    plantFoods: ['Wheatgrass', 'Key lime'],
    runningPlantCount: 117,
    calories: 170,
    protein: 6,
    carbs: 28,
    fats: 6
  },
  {
    time: '13:00',
    meal: 'Lunch',
    type: 'Lunch',
    description: 'Japanese-inspired bowl',
    ingredients: ['Soba noodles', 'Daikon', 'Shiso leaves', 'Mung bean sprouts', 'Sesame oil'],
    plantFoods: ['Soba noodles', 'Daikon', 'Shiso leaves', 'Mung bean sprouts'],
    runningPlantCount: 121,
    calories: 540,
    protein: 24,
    carbs: 66,
    fats: 22
  },
  {
    time: '15:30',
    meal: 'Tea Time',
    type: 'Snack',
    description: 'Savory rice cakes',
    ingredients: ['Red rice', 'Gomasio', 'Tea', 'Milk'],
    plantFoods: ['Red rice', 'Gomasio'],
    runningPlantCount: 123,
    calories: 135,
    protein: 4,
    carbs: 20,
    fats: 6
  },
  {
    time: '17:00',
    meal: 'Dinner',
    type: 'Dinner',
    description: 'Mediterranean chicken platter',
    ingredients: ['Chicken breast', 'Sorghum', 'Radicchio', 'Sorrel', 'Savory'],
    plantFoods: ['Sorghum', 'Radicchio', 'Sorrel', 'Savory'],
    runningPlantCount: 127,
    calories: 575,
    protein: 44,
    carbs: 50,
    fats: 24
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    type: 'Snack',
    description: 'Tropical fruit with dark chocolate',
    ingredients: ['Dragon fruit', 'Soursop', 'Dark chocolate'],
    plantFoods: ['Dragon fruit', 'Soursop'],
    runningPlantCount: 129,
    calories: 120,
    protein: 2,
    carbs: 26,
    fats: 4
  }
];
const sundayMeals: Meal[] = [
  {
    time: '7:00',
    meal: 'Wake Up',
    type: 'Breakfast',
    description: 'Fresh lemon verbena tea with milk',
    ingredients: ['Lemon verbena', 'Milk'],
    plantFoods: ['Lemon verbena'],
    runningPlantCount: 130,
    calories: 30,
    protein: 1,
    carbs: 4,
    fats: 1
  },
  {
    time: '7:30',
    meal: 'Breakfast',
    type: 'Breakfast',
    description: 'Breakfast grain bowl with tea',
    ingredients: ["Job's tears", 'Persimmon', 'Monk fruit', 'Almond milk'],
    plantFoods: ["Job's tears", 'Persimmon', 'Monk fruit'],
    runningPlantCount: 133,
    calories: 450,
    protein: 22,
    carbs: 58,
    fats: 18
  },
  {
    time: '10:30',
    meal: 'Morning Snack',
    type: 'Snack',
    description: 'Seeded crackers with dark chocolate',
    ingredients: ['Flax seeds', 'Caraway seeds', 'Dark chocolate'],
    plantFoods: ['Flax seeds', 'Caraway seeds'],
    runningPlantCount: 135,
    calories: 185,
    protein: 6,
    carbs: 20,
    fats: 11
  },
  {
    time: '13:00',
    meal: 'Lunch',
    type: 'Lunch',
    description: 'Nordic-inspired bowl',
    ingredients: ['Rye berries', 'Sea buckthorn', 'Lingonberries', 'Wood sorrel'],
    plantFoods: ['Rye berries', 'Sea buckthorn', 'Lingonberries', 'Wood sorrel'],
    runningPlantCount: 139,
    calories: 520,
    protein: 24,
    carbs: 62,
    fats: 24
  },
  {
    time: '15:30',
    meal: 'Tea Time',
    type: 'Snack',
    description: 'Root vegetable chips',
    ingredients: ['Sunchokes', 'Yacon root', 'Tea', 'Milk'],
    plantFoods: ['Sunchokes', 'Yacon root'],
    runningPlantCount: 141,
    calories: 130,
    protein: 3,
    carbs: 18,
    fats: 7
  },
  {
    time: '17:00',
    meal: 'Dinner',
    type: 'Dinner',
    description: 'Herb-roasted chicken',
    ingredients: ['Chicken breast', 'Wild rice', 'Malabar spinach', 'Chinese broccoli', 'Winter savory'],
    plantFoods: ['Wild rice', 'Malabar spinach', 'Chinese broccoli', 'Winter savory'],
    runningPlantCount: 145,
    calories: 610,
    protein: 45,
    carbs: 54,
    fats: 26
  },
  {
    time: '19:00',
    meal: 'Evening Snack',
    type: 'Snack',
    description: 'Evening elixir with dark chocolate',
    ingredients: ['Chrysanthemum flowers', 'Schisandra berries', 'Dark chocolate'],
    plantFoods: ['Chrysanthemum flowers', 'Schisandra berries'],
    runningPlantCount: 147,
    calories: 110,
    protein: 2,
    carbs: 22,
    fats: 3
  }
];
const mealsByDay = {
  'Monday': mondayMeals,
  'Tuesday': tuesdayMeals,
  'Wednesday': wednesdayMeals,
  'Thursday': thursdayMeals,
  'Friday': fridayMeals,
  'Saturday': saturdayMeals,
  'Sunday': sundayMeals
};
const categorizeIngredients = (meals: Meal[]) => {
  const categories = {
    proteins: new Set<string>(),
    grainsLegumes: new Set<string>(),
    vegetables: new Set<string>(),
    fruits: new Set<string>(),
    nutsSeeds: new Set<string>(),
    herbsSpices: new Set<string>(),
    other: new Set<string>()
  };

  // Predefined category lists
  const knownIngredients = {
    proteins: ['Chicken breast', 'Tofu', 'Greek yogurt', 'Milk', 'Queso fresco'],
    grainsLegumes: ['Oats', 'Quinoa', 'Rice', 'Farro', 'Black beans', 'Chickpeas', 'Sourdough bread', 'Corn tortillas', 'Buckwheat', 'Amaranth', 'Millet', 'Teff', 'Freekeh', 'Sorghum', "Job's tears", 'Rye berries'],
    vegetables: ['Spinach', 'Carrots', 'Red cabbage', 'Bell peppers', 'Zucchini', 'Cherry tomatoes', 'Sugar snap peas', 'Broccoli', 'Kale', 'Mushrooms', 'Bok choy', 'Asparagus', 'Artichoke hearts', 'Collard greens', 'Japanese yam', 'Kohlrabi', 'Mizuna', 'Malabar spinach', 'Chinese broccoli'],
    fruits: ['Banana', 'Raspberries', 'Blueberries', 'Apple', 'Orange', 'Pomegranate', 'Mango', 'Dragon fruit', 'Passion fruit', 'Persimmon', 'Lime', 'Lemon'],
    nutsSeeds: ['Almonds', 'Chia seeds', 'Pumpkin seeds', 'Walnuts', 'Hemp seeds', 'Brazil nuts', 'Pecans', 'Sunflower seeds', 'Macadamia nuts', 'Pine nuts', 'Flax seeds', 'Caraway seeds'],
    herbsSpices: ['Basil', 'Parsley', 'Cilantro', 'Thyme', 'Turmeric', 'Mint', 'Cardamom', 'Fennel', 'Mexican oregano', 'Tarragon', 'Winter savory']
  };

  meals.forEach(meal => {
    meal.ingredients.forEach(ingredient => {
      // Check each category
      let categorized = false;
      for (const [category, list] of Object.entries(knownIngredients)) {
        if (list.includes(ingredient)) {
          categories[category as keyof typeof categories].add(ingredient);
          categorized = true;
          break;
        }
      }
      // If not found in any category, add to other
      if (!categorized) {
        categories.other.add(ingredient);
      }
    });
  });

  return categories;
};

const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay(); // Returns 0-6 (Sunday-Saturday)
  return days[today];
};

const WeeklyMeals: React.FC = () => {
  // Update this line
  const [activeDay, setActiveDay] = useState(getCurrentDay());
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
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <a href="https://rellished.com" target="_blank" rel="noopener noreferrer">
            <Image
             src="/Rellished-Logo.png"
             alt="Rellished Logo"
             width={300}
             height={160}
             priority
          />
        </a>
      </div>
      {/* Introduction Section */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-lg p-8 mb-8 border border-purple-100">
        <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">Welcome to Rellished Weekly Meal Planner</h1>
        <div className="max-w-3xl mx-auto text-center mb-8">
          <p className="text-gray-700 leading-relaxed">
            We believe that eating well shouldn&apos;t be complicated. This weekly meal plan is designed to take the 
            guesswork out of healthy eating while introducing you to a diverse range of delicious, nutrient-rich foods.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <ChartBar size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 text-purple-900">Track Nutrition</h3>
              <p className="text-gray-600">Balance your nutrition with carefully planned ingredients for every meal</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Sprout size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 text-purple-900">Diverse Plants</h3>
              <p className="text-gray-600">Increase your plant diversity with over 140 unique plant foods</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Utensils size={24} className="text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2 text-purple-900">Get Inspired</h3>
              <p className="text-gray-600">Discover exciting new ingredients and meal combinations</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-700 bg-white p-6 rounded-lg shadow-sm max-w-3xl mx-auto">
          <p className="leading-relaxed">
            Explore each day&apos;s meals, dive into the nutritional details, and use our interactive features to track your 
            progress. We hope this tool helps you discover the joy of diverse, nutritious eating while making your 
            meal planning journey easier and more enjoyable.
          </p>
        </div>
      </div>    

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
          Daily total: {currentMeals[currentMeals.length - 1]?.runningPlantCount || 0} unique plant foods
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
      {/* Daily Ingredients Summary */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Daily Ingredients Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(categorizeIngredients(currentMeals)).map(([category, ingredients]) => (
            ingredients.size > 0 && (
              <div key={category} className="space-y-2">
                <h4 className="font-semibold capitalize text-purple-600">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <ul className="list-disc pl-4 space-y-1">
                  {Array.from(ingredients).sort().map((ingredient, idx) => (
                    <li key={idx} className="text-gray-600">{ingredient}</li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyMeals;