import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { 
  Code, 
  Play, 
  HelpCircle, 
  X, 
  Trophy, 
  Star, 
  Clock, 
  Target,
  CheckCircle,
  Filter,
  Search,
  Zap,
  Brain,
  Rocket,
  Award,
  TrendingUp,
  BookOpen,
  Users,
  ChevronRight,
  Lightbulb,
  Coffee,
  ArrowLeft
} from 'lucide-react';
import { executeCode, getInitialCode } from '../services/codeExecutionService';

const questions = [
  // Python Questions
  {
    id: 1,
    language: 'python',
    difficulty: 'easy',
    category: 'Basics',
    estimatedTime: '5 min',
    points: 10,
    question: 'Hello World – Write a Python program to print "Hello, World!" on the screen.',
    help: '1. Use the `print` function to output the string "Hello, World!" to the console.\n2. Remember to use quotes around the text.\n3. Python is case-sensitive, so make sure to use lowercase "print".',
    tags: ['basics', 'output', 'syntax'],
    popularity: 95
  },
  {
    id: 2,
    language: 'python',
    difficulty: 'easy',
    category: 'Arithmetic',
    estimatedTime: '8 min',
    points: 15,
    question: 'Arithmetic Operations – Take two numbers as input and perform addition, subtraction, multiplication, and division.',
    help: '1. Use the `input()` function to get two numbers from the user.\n2. Convert the input strings to numbers using `int()` or `float()`.\n3. Perform arithmetic operations using `+`, `-`, `*`, and `/` operators.\n4. Display the results using `print()`.',
    tags: ['input', 'arithmetic', 'operators'],
    popularity: 88
  },
  {
    id: 3,
    language: 'python',
    difficulty: 'medium',
    category: 'Conditionals',
    estimatedTime: '10 min',
    points: 20,
    question: 'Even or Odd – Check whether a given integer is even or odd.',
    help: '1. Use the modulus operator `%` to check if the number is divisible by 2.\n2. If the remainder is 0, the number is even; otherwise, it is odd.\n3. Use an if-else statement to display the result.',
    tags: ['conditionals', 'modulus', 'logic'],
    popularity: 92
  },
  {
    id: 4,
    language: 'python',
    difficulty: 'medium',
    category: 'Loops',
    estimatedTime: '12 min',
    points: 25,
    question: 'Factorial Calculation – Calculate the factorial of a number using a loop.',
    help: '1. Use a `for` loop to multiply the numbers from 1 to the given number.\n2. Initialize a variable to store the result and update it in each iteration.\n3. Handle the special case where factorial of 0 is 1.',
    tags: ['loops', 'factorial', 'mathematics'],
    popularity: 85
  },
  {
    id: 5,
    language: 'python',
    difficulty: 'hard',
    category: 'Strings',
    estimatedTime: '15 min',
    points: 35,
    question: 'Palindrome Check – Check if a given string is a palindrome (reads the same forward and backward).',
    help: '1. Convert the string to lowercase for case-insensitive comparison.\n2. Compare the string with its reverse using slicing [::-1].\n3. If they are the same, the string is a palindrome.\n4. Consider removing spaces and punctuation for a more robust solution.',
    tags: ['strings', 'palindrome', 'algorithms'],
    popularity: 78
  },
  {
    id: 6,
    language: 'python',
    difficulty: 'hard',
    category: 'Algorithms',
    estimatedTime: '18 min',
    points: 40,
    question: 'Prime Number Check – Check whether a given number is prime or not.',
    help: '1. Check if the number is less than 2 (not prime).\n2. Check if the number is divisible by any number from 2 to the square root of the number.\n3. If it is divisible, it is not prime.\n4. Use `math.sqrt()` for efficiency.',
    tags: ['algorithms', 'prime', 'mathematics'],
    popularity: 82
  },
  {
    id: 7,
    language: 'python',
    difficulty: 'hard',
    category: 'Sequences',
    estimatedTime: '20 min',
    points: 45,
    question: 'Fibonacci Series – Generate the Fibonacci series up to `n` terms.',
    help: '1. Use a loop to generate the series.\n2. Each term is the sum of the two preceding ones, starting from 0 and 1.\n3. Store the results in a list or print them directly.\n4. Handle edge cases for n <= 0.',
    tags: ['fibonacci', 'sequences', 'loops'],
    popularity: 89
  },
  {
    id: 8,
    language: 'python',
    difficulty: 'hard',
    category: 'Data Structures',
    estimatedTime: '25 min',
    points: 50,
    question: 'List Operations – Create a list of numbers and find the sum, average, maximum, and minimum values.',
    help: '1. Create a list with sample numbers or take input from user.\n2. Use built-in functions `sum()`, `len()`, `max()`, and `min()` on the list.\n3. Calculate average by dividing sum by length.\n4. Display all results in a formatted manner.',
    tags: ['lists', 'statistics', 'built-in-functions'],
    popularity: 91
  },

  // Go Questions
  {
    id: 31,
    language: 'go',
    difficulty: 'easy',
    category: 'Basics',
    estimatedTime: '10 min',
    points: 15,
    question: 'Hello World – Write a Go program to print "Hello, World!" and "Welcome to Go programming!" on separate lines.',
    help: '1. Every Go program must start with `package main`.\n2. Import the `fmt` package for formatted I/O operations.\n3. The `main()` function is the entry point of the program.\n4. Use `fmt.Println()` to print text with a newline.\n5. Remember that Go is case-sensitive.',
    tags: ['basics', 'output', 'syntax', 'fmt'],
    popularity: 96
  },
  {
    id: 32,
    language: 'go',
    difficulty: 'easy',
    category: 'Variables',
    estimatedTime: '12 min',
    points: 20,
    question: 'Variables and Types – Declare variables of different types (int, float64, string, bool) and print their values and types.',
    help: '1. Use `var` keyword for variable declaration or `:=` for short declaration.\n2. Go has strong typing: int, float64, string, bool.\n3. Use `fmt.Printf()` with format verbs like %d, %f, %s, %t.\n4. Use `fmt.Sprintf("%T", variable)` to get the type of a variable.\n5. Zero values: 0 for numbers, "" for strings, false for booleans.',
    tags: ['variables', 'types', 'declaration', 'fmt'],
    popularity: 89
  },
  {
    id: 33,
    language: 'go',
    difficulty: 'medium',
    category: 'Functions',
    estimatedTime: '15 min',
    points: 25,
    question: 'Function with Multiple Returns – Create a function that takes two integers and returns their sum, difference, and product.',
    help: '1. Go functions can return multiple values.\n2. Function syntax: `func functionName(param1 type, param2 type) (returnType1, returnType2) { }`.\n3. Return multiple values using `return value1, value2`.\n4. Call the function and assign to multiple variables: `a, b, c := functionName(x, y)`.\n5. You can name return values for clarity.',
    tags: ['functions', 'multiple-returns', 'arithmetic'],
    popularity: 85
  },
  {
    id: 34,
    language: 'go',
    difficulty: 'medium',
    category: 'Slices',
    estimatedTime: '18 min',
    points: 30,
    question: 'Slice Operations – Create a slice of integers, add elements using append, and find the sum and average of all elements.',
    help: '1. Create a slice: `numbers := []int{1, 2, 3}` or `var numbers []int`.\n2. Use `append()` to add elements: `numbers = append(numbers, 4, 5)`.\n3. Iterate using `for i, value := range slice` or `for i := 0; i < len(slice); i++`.\n4. Use `len(slice)` to get the length.\n5. Calculate sum in a loop and divide by length for average.',
    tags: ['slices', 'append', 'iteration', 'range'],
    popularity: 82
  },
  {
    id: 35,
    language: 'go',
    difficulty: 'medium',
    category: 'Structs',
    estimatedTime: '20 min',
    points: 35,
    question: 'Struct and Methods – Define a `Person` struct with `name` and `age` fields, and create a method to check if the person is an adult (age >= 18).',
    help: '1. Define struct: `type Person struct { name string; age int }`.\n2. Create instance: `p := Person{name: "John", age: 25}` or `p := Person{"John", 25}`.\n3. Define method: `func (p Person) methodName() returnType { }`.\n4. Access fields using dot notation: `p.name`, `p.age`.\n5. Methods can have pointer receivers `(p *Person)` for modification.',
    tags: ['structs', 'methods', 'types', 'receivers'],
    popularity: 78
  },
  {
    id: 36,
    language: 'go',
    difficulty: 'hard',
    category: 'Goroutines',
    estimatedTime: '25 min',
    points: 40,
    question: 'Basic Goroutines – Create a program that launches 3 goroutines, each printing numbers 1-5 with their goroutine ID, and use time.Sleep to see concurrent execution.',
    help: '1. Use `go functionName()` to start a goroutine.\n2. Import `time` package for `time.Sleep()`.\n3. Use `time.Sleep(time.Millisecond * 100)` for small delays.\n4. Main function should wait: `time.Sleep(time.Second * 2)` at the end.\n5. Each goroutine runs concurrently, so output order may vary.\n6. Pass goroutine ID as parameter to distinguish them.',
    tags: ['goroutines', 'concurrency', 'time', 'sleep'],
    popularity: 75
  },
  {
    id: 37,
    language: 'go',
    difficulty: 'hard',
    category: 'Interfaces',
    estimatedTime: '22 min',
    points: 35,
    question: 'Interface Implementation – Define a `Shape` interface with `Area()` method, and implement it for `Rectangle` and `Circle` structs.',
    help: '1. Define interface: `type Shape interface { Area() float64 }`.\n2. Create structs: `type Rectangle struct { width, height float64 }`.\n3. Implement methods: `func (r Rectangle) Area() float64 { return r.width * r.height }`.\n4. For Circle: use `math.Pi * r.radius * r.radius`.\n5. Use interface: `var s Shape = Rectangle{5, 3}; fmt.Println(s.Area())`.\n6. Import `math` package for Pi constant.',
    tags: ['interfaces', 'methods', 'polymorphism', 'math'],
    popularity: 73
  },
  {
    id: 38,
    language: 'go',
    difficulty: 'hard',
    category: 'Error Handling',
    estimatedTime: '20 min',
    points: 45,
    question: 'Error Handling – Create a function that divides two numbers and returns an error if division by zero is attempted. Handle the error properly in main.',
    help: '1. Function signature: `func divide(a, b float64) (float64, error)`.\n2. Check for zero: `if b == 0 { return 0, errors.New("division by zero") }`.\n3. Import `errors` package for `errors.New()`.\n4. Return success: `return a/b, nil`.\n5. In main: `result, err := divide(10, 0); if err != nil { fmt.Println("Error:", err) }`.\n6. Handle both success and error cases.',
    tags: ['error-handling', 'errors', 'functions', 'nil'],
    popularity: 70
  },

  // C Questions
  {
    id: 11,
    language: 'c',
    difficulty: 'easy',
    category: 'Basics',
    estimatedTime: '8 min',
    points: 10,
    question: 'Hello World – Write a C program to print "Hello, World!" on the screen.',
    help: '1. Include the stdio.h header file for input/output functions.\n2. Use the `printf` function to output the string "Hello, World!" to the console.\n3. Remember to add \\n for a new line.\n4. Return 0 from main function.',
    tags: ['basics', 'output', 'syntax'],
    popularity: 94
  },
  {
    id: 12,
    language: 'c',
    difficulty: 'easy',
    category: 'Arithmetic',
    estimatedTime: '12 min',
    points: 15,
    question: 'Arithmetic Operations – Take two numbers as input and perform addition, subtraction, multiplication, and division.',
    help: '1. Use the `scanf` function to get two numbers from the user.\n2. Declare variables with appropriate data types (int, float).\n3. Perform arithmetic operations using `+`, `-`, `*`, and `/` operators.\n4. Use printf with format specifiers to display results.',
    tags: ['input', 'arithmetic', 'operators'],
    popularity: 87
  },
  {
    id: 13,
    language: 'c',
    difficulty: 'medium',
    category: 'Conditionals',
    estimatedTime: '15 min',
    points: 20,
    question: 'Even or Odd – Check whether a given integer is even or odd.',
    help: '1. Use the modulus operator `%` to check if the number is divisible by 2.\n2. If the remainder is 0, the number is even; otherwise, it is odd.\n3. Use an if-else statement to display the result.\n4. Handle input validation.',
    tags: ['conditionals', 'modulus', 'logic'],
    popularity: 90
  },
  {
    id: 14,
    language: 'c',
    difficulty: 'medium',
    category: 'Loops',
    estimatedTime: '18 min',
    points: 25,
    question: 'Factorial Calculation – Calculate the factorial of a number using a loop.',
    help: '1. Use a `for` loop to multiply the numbers from 1 to the given number.\n2. Initialize a variable to store the result and update it in each iteration.\n3. Use long long int for larger factorials.\n4. Handle the special case where factorial of 0 is 1.',
    tags: ['loops', 'factorial', 'mathematics'],
    popularity: 83
  },
  {
    id: 15,
    language: 'c',
    difficulty: 'hard',
    category: 'Strings',
    estimatedTime: '22 min',
    points: 35,
    question: 'Palindrome Check – Check if a given string is a palindrome (reads the same forward and backward).',
    help: '1. Use string.h library for string functions.\n2. Compare characters from start and end moving towards center.\n3. Use strlen() to get string length.\n4. Consider case-insensitive comparison using tolower().',
    tags: ['strings', 'palindrome', 'algorithms'],
    popularity: 76
  },
  {
    id: 16,
    language: 'c',
    difficulty: 'hard',
    category: 'Algorithms',
    estimatedTime: '25 min',
    points: 40,
    question: 'Prime Number Check – Check whether a given number is prime or not.',
    help: '1. Check if the number is less than 2 (not prime).\n2. Check if the number is divisible by any number from 2 to the square root of the number.\n3. Use math.h library for sqrt() function.\n4. Optimize by checking only odd numbers after 2.',
    tags: ['algorithms', 'prime', 'mathematics'],
    popularity: 80
  },

  // C++ Questions
  {
    id: 21,
    language: 'cpp',
    difficulty: 'easy',
    category: 'Basics',
    estimatedTime: '8 min',
    points: 10,
    question: 'Hello World – Write a C++ program to print "Hello, World!" on the screen.',
    help: '1. Include the iostream header file for input/output operations.\n2. Use the `std::cout` function to output the string "Hello, World!" to the console.\n3. Use std::endl or \\n for a new line.\n4. Remember to use the std namespace or std:: prefix.',
    tags: ['basics', 'output', 'syntax'],
    popularity: 93
  },
  {
    id: 22,
    language: 'cpp',
    difficulty: 'easy',
    category: 'Arithmetic',
    estimatedTime: '12 min',
    points: 15,
    question: 'Arithmetic Operations – Take two numbers as input and perform addition, subtraction, multiplication, and division.',
    help: '1. Use the `std::cin` function to get two numbers from the user.\n2. Declare variables with appropriate data types (int, double).\n3. Perform arithmetic operations using `+`, `-`, `*`, and `/` operators.\n4. Use std::cout to display results with proper formatting.',
    tags: ['input', 'arithmetic', 'operators'],
    popularity: 86
  },
  {
    id: 23,
    language: 'cpp',
    difficulty: 'medium',
    category: 'Conditionals',
    estimatedTime: '15 min',
    points: 20,
    question: 'Even or Odd – Check whether a given integer is even or odd.',
    help: '1. Use the modulus operator `%` to check if the number is divisible by 2.\n2. If the remainder is 0, the number is even; otherwise, it is odd.\n3. Use an if-else statement to display the result.\n4. Consider using ternary operator for concise code.',
    tags: ['conditionals', 'modulus', 'logic'],
    popularity: 89
  },
  {
    id: 24,
    language: 'cpp',
    difficulty: 'medium',
    category: 'Loops',
    estimatedTime: '18 min',
    points: 25,
    question: 'Factorial Calculation – Calculate the factorial of a number using a loop.',
    help: '1. Use a `for` loop to multiply the numbers from 1 to the given number.\n2. Initialize a variable to store the result and update it in each iteration.\n3. Use long long for larger factorials.\n4. Consider using recursion as an alternative approach.',
    tags: ['loops', 'factorial', 'mathematics'],
    popularity: 84
  },
  {
    id: 25,
    language: 'cpp',
    difficulty: 'hard',
    category: 'OOP',
    estimatedTime: '30 min',
    points: 50,
    question: 'Class and Object – Create a `Student` class with `name` and `marks` attributes, and a method to check if the student has passed (pass mark: 40%).',
    help: '1. Define a class `Student` with private data members `name` and `marks`.\n2. Create public member functions for setting and getting values.\n3. Add a method `hasPassed()` that returns `true` if marks are 40% or more.\n4. Create objects and test the functionality.',
    tags: ['oop', 'classes', 'objects'],
    popularity: 87
  },
  {
    id: 26,
    language: 'cpp',
    difficulty: 'hard',
    category: 'STL',
    estimatedTime: '25 min',
    points: 45,
    question: 'Vector Operations – Use C++ STL vector to store numbers and perform various operations like sorting, searching, and finding statistics.',
    help: '1. Include <vector> and <algorithm> headers.\n2. Create a vector and add elements using push_back().\n3. Use sort() function to sort the vector.\n4. Use find() or binary_search() for searching.\n5. Calculate sum, average, min, and max values.',
    tags: ['stl', 'vector', 'algorithms'],
    popularity: 81
  }
];

const difficultyColors = {
  easy: 'from-green-500 to-emerald-500',
  medium: 'from-yellow-500 to-orange-500',
  hard: 'from-red-500 to-pink-500'
};

const languageColors = {
  python: 'from-blue-500 to-cyan-500',
  c: 'from-gray-500 to-slate-600',
  cpp: 'from-purple-500 to-indigo-500',
  go: 'from-teal-500 to-cyan-600'
};

const categoryIcons = {
  'Basics': Code,
  'Arithmetic': Target,
  'Conditionals': Brain,
  'Loops': Rocket,
  'Strings': BookOpen,
  'Algorithms': Zap,
  'Sequences': TrendingUp,
  'Data Structures': Trophy,
  'OOP': Award,
  'STL': Star,
  'Variables': Target,
  'Functions': Zap,
  'Slices': BookOpen,
  'Structs': Award,
  'Goroutines': Rocket,
  'Interfaces': Star,
  'Error Handling': Brain
};

interface Question {
  id: number;
  language: string;
  difficulty: string;
  category: string;
  estimatedTime: string;
  points: number;
  question: string;
  help: string;
  tags: string[];
  popularity: number;
}

export function Enhancement() {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<number>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍', color: 'from-blue-500 to-cyan-500' },
    { id: 'c', name: 'C', icon: '⚡', color: 'from-gray-500 to-slate-600' },
    { id: 'cpp', name: 'C++', icon: '🚀', color: 'from-purple-500 to-indigo-500' },
    { id: 'go', name: 'Go', icon: '🔷', color: 'from-teal-500 to-cyan-600' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', icon: '🟢', points: '10-20 pts' },
    { id: 'medium', name: 'Medium', icon: '🟡', points: '20-30 pts' },
    { id: 'hard', name: 'Hard', icon: '🔴', points: '30-50 pts' }
  ];

  const categories = [...new Set(questions.map(q => q.category))];

  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsCodeEditorOpen(true);
    setCode(getInitialCode(question.language));
    setIsHelpOpen(false);
    setOutput('');
  };

  const getLanguageId = (language: string): string => {
    switch (language) {
      case 'python': return 'python';
      case 'c': return 'c';
      case 'cpp': return 'cpp';
      case 'go': return 'go';
      default: return 'plaintext';
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesLanguage = selectedLanguage === 'all' || question.language === selectedLanguage;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesLanguage && matchesDifficulty && matchesCategory && matchesSearch;
  });

  const handleRunCode = async () => {
    if (!selectedQuestion) return;

    const startTime = Date.now();
    setOutput('🚀 Compiling and executing your code...');
    setExecutionTime(null);
    
    try {
      const result = await executeCode(selectedQuestion.language, code);
      const endTime = Date.now();
      const execTime = result.executionTime || (endTime - startTime);
      setExecutionTime(execTime);
      
      if (result.error) {
        setOutput(`❌ Compilation Error:\n\n${result.error}\n\n💡 Check your syntax and try again.\n\n⏱️ Compilation Time: ${execTime}ms`);
      } else {
        const successOutput = `✅ Code executed successfully!\n\n📊 Output:\n${result.output}\n\n📈 Results:\n- Language: ${selectedQuestion.language.toUpperCase()}\n- Difficulty: ${selectedQuestion.difficulty}\n- Points: ${selectedQuestion.points}\n- Execution Time: ${execTime}ms\n\n💡 Great job! Keep practicing to improve your skills.`;
        setOutput(successOutput);
        
        // Mark question as completed only if code executed successfully
        if (!completedQuestions.has(selectedQuestion.id)) {
          setCompletedQuestions(prev => new Set([...prev, selectedQuestion.id]));
          setTotalPoints(prev => prev + selectedQuestion.points);
        }
      }
    } catch (error) {
      const endTime = Date.now();
      const execTime = endTime - startTime;
      setExecutionTime(execTime);
      setOutput(`❌ Execution Error:\n\n${error instanceof Error ? error.message : 'Unknown error occurred'}\n\n💡 Please try again.\n\n⏱️ Error Time: ${execTime}ms`);
    }
  };

  const stats = [
    { label: 'Total Questions', value: questions.length, icon: BookOpen, color: 'text-cyan-400' },
    { label: 'Completed', value: completedQuestions.size, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Points Earned', value: totalPoints, icon: Trophy, color: 'text-yellow-400' },
    { label: 'Languages', value: 4, icon: Code, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl mb-6 animate-bounce">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 animate-[slideDown_0.6s_ease-out]">
              Code Enhancement
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Challenge Hub
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 animate-[slideUp_0.6s_ease-out]">
              Sharpen your programming skills with hands-on coding challenges. Practice, learn, and master Python, C, C++, and Go.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-slate-800/30 backdrop-blur-xl p-6 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-all duration-300 animate-[fadeIn_0.6s_ease-out] opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter Section */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 mb-8">
            <div className="flex flex-wrap gap-6">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search challenges..."
                    className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-12 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Language Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLanguage('all')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedLanguage === 'all' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                      : 'bg-slate-700/50 text-gray-300 hover:text-white border border-slate-600'
                  }`}
                >
                  All Languages
                </button>
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      selectedLanguage === lang.id 
                        ? `bg-gradient-to-r ${lang.color} text-white` 
                        : 'bg-slate-700/50 text-gray-300 hover:text-white border border-slate-600'
                    }`}
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedDifficulty === 'all' 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
                      : 'bg-slate-700/50 text-gray-300 hover:text-white border border-slate-600'
                  }`}
                >
                  All Levels
                </button>
                {difficulties.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                      selectedDifficulty === diff.id 
                        ? `bg-gradient-to-r ${difficultyColors[diff.id as keyof typeof difficultyColors]} text-white` 
                        : 'bg-slate-700/50 text-gray-300 hover:text-white border border-slate-600'
                    }`}
                  >
                    <span>{diff.icon}</span>
                    <span>{diff.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question, index) => {
              const CategoryIcon = categoryIcons[question.category as keyof typeof categoryIcons] || Code;
              const isCompleted = completedQuestions.has(question.id);
              
              return (
                <div
                  key={question.id}
                  className="group bg-slate-800/50 backdrop-blur-xl rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer animate-[fadeIn_0.6s_ease-out] opacity-0"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                  onClick={() => handleQuestionClick(question)}
                >
                  {/* Question Header */}
                  <div className={`relative p-4 bg-gradient-to-r ${languageColors[question.language as keyof typeof languageColors]} text-white`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CategoryIcon className="w-5 h-5" />
                        <span className="font-semibold">{question.category}</span>
                      </div>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-300" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">{question.language.toUpperCase()}</span>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{question.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          <span>{question.points} pts</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${difficultyColors[question.difficulty as keyof typeof difficultyColors]} text-white`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm text-gray-400">{question.popularity}%</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      {question.question}
                    </h3>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-slate-700/50 text-cyan-400 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        <Play className="w-4 h-4" />
                        <span className="font-medium">Start Challenge</span>
                      </button>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredQuestions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No challenges found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLanguage('all');
                  setSelectedDifficulty('all');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Code Editor Modal */}
      {isCodeEditorOpen && selectedQuestion && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl w-full max-w-7xl h-[90vh] border border-slate-700 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className={`flex justify-between items-center p-6 border-b border-slate-700 bg-gradient-to-r ${languageColors[selectedQuestion.language as keyof typeof languageColors]}`}>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsCodeEditorOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
                  title="Back to Challenges"
                >
                  <ArrowLeft className="h-5 w-5 text-white" />
                </button>
                <div className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold text-white">{selectedQuestion.category} Challenge</h3>
                </div>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{selectedQuestion.estimatedTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">{selectedQuestion.points} points</span>
                  </div>
                  {executionTime && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm">{executionTime}ms</span>
                    </div>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/20`}>
                    {selectedQuestion.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCodeEditorOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex h-[calc(100%-80px)]">
              {/* Left Panel - Question & Help */}
              <div className="w-1/3 border-r border-slate-700 flex flex-col">
                <div className="p-6 flex-1 overflow-y-auto">
                  <h4 className="text-lg font-semibold text-white mb-4">📝 Challenge Description</h4>
                  <p className="text-gray-300 mb-6 leading-relaxed">{selectedQuestion.question}</p>
                  
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setIsHelpOpen(!isHelpOpen)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isHelpOpen 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>{isHelpOpen ? 'Hide Hints' : 'Show Hints'}</span>
                    </button>
                  </div>

                  {isHelpOpen && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                      <h5 className="text-amber-400 font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4" />
                        Helpful Hints
                      </h5>
                      <pre className="text-amber-200 text-sm whitespace-pre-wrap font-mono">
                        {selectedQuestion.help}
                      </pre>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-white font-medium mb-2">🏷️ Tags</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedQuestion.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-slate-700/50 text-cyan-400 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Run Button */}
                <div className="p-6 border-t border-slate-700">
                  <button
                    onClick={handleRunCode}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02]"
                  >
                    <Play className="w-5 h-5" />
                    <span>Run Code</span>
                  </button>
                </div>
              </div>

              {/* Right Panel - Code Editor & Output */}
              <div className="flex-1 flex flex-col">
                {/* Code Editor */}
                <div className="flex-1 border-b border-slate-700">
                  <div className="h-full">
                    <Editor
                      height="100%"
                      defaultLanguage={getLanguageId(selectedQuestion.language)}
                      value={code}
                      theme="vs-dark"
                      onChange={(value) => setCode(value || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2,
                        wordWrap: 'on',
                        padding: { top: 16, bottom: 16 }
                      }}
                    />
                  </div>
                </div>

                {/* Output Panel */}
                <div className="h-64 bg-slate-900 p-4 overflow-y-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <Coffee className="w-4 h-4 text-cyan-400" />
                    <h5 className="text-cyan-400 font-medium">Output Console</h5>
                  </div>
                  <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                    {output || '💡 Click "Run Code" to see your output here...'}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}