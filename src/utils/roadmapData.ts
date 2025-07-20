interface Topic {
  name: string;
  description?: string;
}

interface RoadmapSection {
  title: string;
  topics: Topic[];
}

export function getRoadmapData(language: string): RoadmapSection[] {
  const roadmaps: Record<string, RoadmapSection[]> = {
    'Python': [
      {
        title: '1. Python Fundamentals',
        topics: [
          { name: 'Installation & Setup', description: 'Install Python, set up IDE (VS Code, PyCharm), understand Python interpreter' },
          { name: 'Variables & Data Types', description: 'Integers, floats, strings, booleans, lists, tuples, dictionaries, sets' },
          { name: 'Basic Input/Output', description: 'print() function, input() function, string formatting' },
          { name: 'Operators', description: 'Arithmetic, comparison, logical, assignment, membership, identity operators' },
          { name: 'Comments & Documentation', description: 'Single-line, multi-line comments, docstrings, PEP 8 style guide' }
        ]
      },
      {
        title: '2. Control Flow & Functions',
        topics: [
          { name: 'Conditional Statements', description: 'if, elif, else statements, nested conditions, ternary operator' },
          { name: 'Loops', description: 'for loops, while loops, break, continue, else clause in loops' },
          { name: 'Functions', description: 'Function definition, parameters, arguments, return values, scope' },
          { name: 'Lambda Functions', description: 'Anonymous functions, lambda expressions, functional programming basics' },
          { name: 'Built-in Functions', description: 'len(), range(), enumerate(), zip(), map(), filter(), sorted()' }
        ]
      },
      {
        title: '3. Data Structures',
        topics: [
          { name: 'Lists', description: 'List methods, slicing, list comprehensions, nested lists' },
          { name: 'Tuples', description: 'Tuple operations, packing/unpacking, named tuples' },
          { name: 'Dictionaries', description: 'Dictionary methods, iteration, dictionary comprehensions' },
          { name: 'Sets', description: 'Set operations, set methods, set comprehensions' },
          { name: 'Strings', description: 'String methods, formatting, regular expressions basics' }
        ]
      },
      {
        title: '4. Object-Oriented Programming',
        topics: [
          { name: 'Classes & Objects', description: 'Class definition, object instantiation, attributes, methods' },
          { name: 'Inheritance', description: 'Single inheritance, multiple inheritance, method overriding' },
          { name: 'Encapsulation', description: 'Private/protected attributes, property decorators, getters/setters' },
          { name: 'Polymorphism', description: 'Method overloading, duck typing, abstract classes' },
          { name: 'Special Methods', description: '__init__, __str__, __repr__, __len__, operator overloading' }
        ]
      },
      {
        title: '5. Advanced Python',
        topics: [
          { name: 'File Handling', description: 'Reading/writing files, context managers, CSV, JSON handling' },
          { name: 'Exception Handling', description: 'try/except/finally, custom exceptions, exception hierarchy' },
          { name: 'Modules & Packages', description: 'Import statements, creating modules, package structure, __init__.py' },
          { name: 'Decorators', description: 'Function decorators, class decorators, built-in decorators' },
          { name: 'Generators & Iterators', description: 'yield keyword, generator expressions, iterator protocol' }
        ]
      },
      {
        title: '6. Libraries & Frameworks',
        topics: [
          { name: 'Standard Library', description: 'os, sys, datetime, collections, itertools, functools' },
          { name: 'Data Science', description: 'NumPy, Pandas, Matplotlib, Seaborn for data analysis' },
          { name: 'Web Development', description: 'Django, Flask, FastAPI for web applications' },
          { name: 'Testing', description: 'unittest, pytest, mock, test-driven development' },
          { name: 'Virtual Environments', description: 'venv, pip, requirements.txt, package management' }
        ]
      }
    ],
    'C': [
      {
        title: '1. C Programming Basics',
        topics: [
          { name: 'Environment Setup', description: 'Install GCC compiler, set up IDE (Code::Blocks, Dev-C++), understand compilation process' },
          { name: 'Program Structure', description: 'Header files, main() function, preprocessor directives, compilation steps' },
          { name: 'Data Types', description: 'int, char, float, double, void, size_t, type modifiers (short, long, signed, unsigned)' },
          { name: 'Variables & Constants', description: 'Variable declaration, initialization, scope, storage classes, const keyword' },
          { name: 'Input/Output', description: 'printf(), scanf(), getchar(), putchar(), format specifiers' }
        ]
      },
      {
        title: '2. Operators & Control Flow',
        topics: [
          { name: 'Operators', description: 'Arithmetic, relational, logical, bitwise, assignment, increment/decrement' },
          { name: 'Conditional Statements', description: 'if-else, nested if, switch-case, conditional operator' },
          { name: 'Loops', description: 'for, while, do-while loops, break, continue, nested loops' },
          { name: 'Control Flow', description: 'goto statement, return statement, exit() function' },
          { name: 'Operator Precedence', description: 'Understanding operator precedence and associativity' }
        ]
      },
      {
        title: '3. Functions & Arrays',
        topics: [
          { name: 'Functions', description: 'Function declaration, definition, parameters, return types, recursion' },
          { name: 'Function Parameters', description: 'Pass by value, function prototypes, variable arguments' },
          { name: 'Arrays', description: 'One-dimensional arrays, initialization, array operations' },
          { name: 'Multi-dimensional Arrays', description: '2D arrays, matrix operations, array of arrays' },
          { name: 'Strings', description: 'Character arrays, string functions, string manipulation' }
        ]
      },
      {
        title: '4. Pointers & Memory',
        topics: [
          { name: 'Pointers Basics', description: 'Pointer declaration, dereferencing, address operator, null pointers' },
          { name: 'Pointer Arithmetic', description: 'Pointer increment/decrement, pointer comparison, void pointers' },
          { name: 'Arrays & Pointers', description: 'Array-pointer relationship, pointer to arrays, array of pointers' },
          { name: 'Dynamic Memory', description: 'malloc(), calloc(), realloc(), free(), memory leaks' },
          { name: 'Function Pointers', description: 'Pointer to functions, callback functions, function arrays' }
        ]
      },
      {
        title: '5. Advanced Concepts',
        topics: [
          { name: 'Structures', description: 'Structure definition, initialization, nested structures, typedef' },
          { name: 'Unions & Enums', description: 'Union declaration, enumeration, bit fields' },
          { name: 'File Operations', description: 'File pointers, fopen(), fclose(), fread(), fwrite(), file modes' },
          { name: 'Preprocessor', description: 'Macros, conditional compilation, header guards, predefined macros' },
          { name: 'Command Line Arguments', description: 'argc, argv, processing command line parameters' }
        ]
      },
      {
        title: '6. Data Structures & Algorithms',
        topics: [
          { name: 'Linked Lists', description: 'Singly linked lists, doubly linked lists, circular linked lists' },
          { name: 'Stacks & Queues', description: 'Stack implementation, queue implementation, applications' },
          { name: 'Trees', description: 'Binary trees, binary search trees, tree traversals' },
          { name: 'Sorting Algorithms', description: 'Bubble sort, selection sort, insertion sort, merge sort, quick sort' },
          { name: 'Searching Algorithms', description: 'Linear search, binary search, hash tables' }
        ]
      }
    ],
    'C++': [
      {
        title: '1. C++ Fundamentals',
        topics: [
          { name: 'Environment Setup', description: 'Install C++ compiler (GCC, Clang, MSVC), IDE setup (Visual Studio, Code::Blocks)' },
          { name: 'Basic Syntax', description: 'Program structure, namespaces, using directive, iostream library' },
          { name: 'Data Types & Variables', description: 'Built-in types, auto keyword, type inference, const correctness' },
          { name: 'Input/Output Streams', description: 'cin, cout, cerr, stream manipulators, file streams' },
          { name: 'References', description: 'Reference variables, reference vs pointers, const references' }
        ]
      },
      {
        title: '2. Object-Oriented Programming',
        topics: [
          { name: 'Classes & Objects', description: 'Class definition, object creation, member functions, data members' },
          { name: 'Constructors & Destructors', description: 'Default constructor, parameterized constructor, copy constructor, destructor' },
          { name: 'Inheritance', description: 'Public, private, protected inheritance, virtual inheritance, diamond problem' },
          { name: 'Polymorphism', description: 'Function overloading, operator overloading, virtual functions, pure virtual functions' },
          { name: 'Encapsulation', description: 'Access specifiers, friend functions, friend classes, data hiding' }
        ]
      },
      {
        title: '3. Advanced OOP Concepts',
        topics: [
          { name: 'Virtual Functions', description: 'Virtual function tables, runtime polymorphism, abstract classes' },
          { name: 'Operator Overloading', description: 'Overloading arithmetic, comparison, assignment, stream operators' },
          { name: 'Copy Semantics', description: 'Copy constructor, copy assignment operator, deep vs shallow copy' },
          { name: 'Move Semantics', description: 'Move constructor, move assignment, rvalue references, std::move' },
          { name: 'RAII', description: 'Resource Acquisition Is Initialization, smart pointers, exception safety' }
        ]
      },
      {
        title: '4. Standard Template Library',
        topics: [
          { name: 'Containers', description: 'vector, list, deque, set, map, unordered_map, array' },
          { name: 'Iterators', description: 'Iterator types, iterator operations, range-based for loops' },
          { name: 'Algorithms', description: 'sort, find, transform, for_each, STL algorithm library' },
          { name: 'Function Objects', description: 'Functors, lambda expressions, std::function, predicates' },
          { name: 'String Class', description: 'std::string operations, string manipulation, string streams' }
        ]
      },
      {
        title: '5. Modern C++ Features',
        topics: [
          { name: 'C++11 Features', description: 'auto keyword, range-based for, nullptr, uniform initialization' },
          { name: 'Smart Pointers', description: 'unique_ptr, shared_ptr, weak_ptr, memory management' },
          { name: 'Lambda Expressions', description: 'Lambda syntax, capture lists, generic lambdas' },
          { name: 'Threading', description: 'std::thread, mutex, condition variables, atomic operations' },
          { name: 'C++14/17/20 Features', description: 'constexpr, structured bindings, concepts, ranges' }
        ]
      },
      {
        title: '6. Advanced Topics',
        topics: [
          { name: 'Templates', description: 'Function templates, class templates, template specialization, SFINAE' },
          { name: 'Exception Handling', description: 'try-catch blocks, exception specifications, custom exceptions' },
          { name: 'Memory Management', description: 'new/delete operators, placement new, memory pools' },
          { name: 'Design Patterns', description: 'Singleton, Factory, Observer, Strategy patterns in C++' },
          { name: 'Performance Optimization', description: 'Profiling, optimization techniques, move semantics, RVO' }
        ]
      }
    ],
    'Go': [
      {
        title: '1. Go Fundamentals',
        topics: [
          { name: 'Installation & Setup', description: 'Install Go, set up GOPATH/GOROOT, understand go mod, workspace setup' },
          { name: 'Package System', description: 'package main, imports, exported/unexported identifiers, go modules' },
          { name: 'Variables & Types', description: 'var declarations, short declarations (:=), basic types, zero values' },
          { name: 'Constants & iota', description: 'const declarations, iota enumerator, typed/untyped constants' },
          { name: 'Basic I/O', description: 'fmt package, Printf/Println/Scanf, string formatting verbs' }
        ]
      },
      {
        title: '2. Control Structures',
        topics: [
          { name: 'Conditionals', description: 'if/else statements, switch statements, type switches' },
          { name: 'Loops', description: 'for loops (only loop in Go), range keyword, break/continue' },
          { name: 'Functions', description: 'Function declaration, parameters, return values, multiple returns' },
          { name: 'Defer Statement', description: 'defer keyword, execution order, cleanup patterns' },
          { name: 'Error Handling', description: 'error interface, error creation, error checking patterns' }
        ]
      },
      {
        title: '3. Data Structures',
        topics: [
          { name: 'Arrays & Slices', description: 'Array declaration, slice operations, append/copy, slice internals' },
          { name: 'Maps', description: 'Map creation, operations, iteration, zero value behavior' },
          { name: 'Strings', description: 'String operations, runes, UTF-8, strings package' },
          { name: 'Pointers', description: 'Pointer declaration, dereferencing, pointer arithmetic limitations' },
          { name: 'Structs', description: 'Struct definition, initialization, embedding, tags' }
        ]
      },
      {
        title: '4. Methods & Interfaces',
        topics: [
          { name: 'Methods', description: 'Method declaration, receiver types, pointer vs value receivers' },
          { name: 'Interfaces', description: 'Interface definition, implicit implementation, empty interface' },
          { name: 'Type Assertions', description: 'Type assertions, type switches, interface conversions' },
          { name: 'Composition', description: 'Struct embedding, interface composition, design patterns' },
          { name: 'Polymorphism', description: 'Interface-based polymorphism, duck typing in Go' }
        ]
      },
      {
        title: '5. Concurrency',
        topics: [
          { name: 'Goroutines', description: 'go keyword, goroutine creation, goroutine lifecycle' },
          { name: 'Channels', description: 'Channel creation, sending/receiving, buffered channels' },
          { name: 'Select Statement', description: 'select with channels, non-blocking operations, timeouts' },
          { name: 'Sync Package', description: 'Mutex, RWMutex, WaitGroup, Once, atomic operations' },
          { name: 'Concurrency Patterns', description: 'Worker pools, fan-in/fan-out, pipeline patterns' }
        ]
      },
      {
        title: '6. Advanced Topics',
        topics: [
          { name: 'Standard Library', description: 'io, net/http, encoding/json, time, os packages' },
          { name: 'Testing', description: 'testing package, benchmarks, examples, test coverage' },
          { name: 'Reflection', description: 'reflect package, type inspection, value manipulation' },
          { name: 'Build & Deploy', description: 'go build, cross-compilation, build tags, deployment' },
          { name: 'Performance', description: 'Profiling, memory management, garbage collector, optimization' }
        ]
      }
    ]
  };

  return roadmaps[language] || [];
}