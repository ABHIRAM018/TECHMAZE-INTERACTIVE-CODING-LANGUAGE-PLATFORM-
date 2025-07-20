/*
  # Add default resources for programming languages

  1. Changes
    - Add default YouTube playlists for Python, C, and C++
    - Add default programming notes for Python, C, and C++

  2. Details
    - 5 YouTube playlists per language
    - 5 notes resources per language
    - All resources are carefully curated from reputable sources
*/

-- Insert default YouTube playlists
INSERT INTO youtube_resources (language, title, url)
VALUES
  -- Python playlists
  ('Python', 'Python for Beginners - Full Course', 'https://www.youtube.com/watch?v=_uQrJ0TkZlc'),
  ('Python', 'Python OOP Tutorial', 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM'),
  ('Python', 'Python Data Structures & Algorithms', 'https://www.youtube.com/watch?v=pkYVOmU3MgA'),
  ('Python', 'Python Web Development with Django', 'https://www.youtube.com/watch?v=F5mRW0jo-U4'),
  ('Python', 'Python Machine Learning & AI', 'https://www.youtube.com/watch?v=WFr2WgN9_xE'),

  -- C programming playlists
  ('C', 'C Programming for Beginners', 'https://www.youtube.com/watch?v=KJgsSFOSQv0'),
  ('C', 'Data Structures using C', 'https://www.youtube.com/watch?v=B31LgI4Y4DQ'),
  ('C', 'Advanced C Programming Concepts', 'https://www.youtube.com/watch?v=8PrOp9t0PyQ'),
  ('C', 'C Programming Projects', 'https://www.youtube.com/watch?v=1uR4tL-OSNI'),
  ('C', 'Pointers in C Programming', 'https://www.youtube.com/watch?v=zuegQmMdy8M'),

  -- C++ playlists
  ('C++', 'C++ Programming Course - Beginner to Advanced', 'https://www.youtube.com/watch?v=8jLOx1hD3_o'),
  ('C++', 'C++ Object-Oriented Programming', 'https://www.youtube.com/watch?v=wN0x9eZLix4'),
  ('C++', 'Modern C++ Features', 'https://www.youtube.com/watch?v=18c3MTX0PK0'),
  ('C++', 'C++ STL Tutorial', 'https://www.youtube.com/watch?v=PZogbfU4X5E'),
  ('C++', 'C++ Game Development', 'https://www.youtube.com/watch?v=PGSOZxPzNdE');

-- Insert default programming notes
INSERT INTO notes_resources (language, title, url)
VALUES
  -- Python notes
  ('Python', 'Python Official Documentation', 'https://docs.python.org/3/'),
  ('Python', 'Python Programming Notes PDF', 'https://www.w3schools.com/python/'),
  ('Python', 'Python Best Practices Guide', 'https://realpython.com/'),
  ('Python', 'Python Design Patterns', 'https://python-patterns.guide/'),
  ('Python', 'Python Interview Questions', 'https://www.geeksforgeeks.org/python-programming-language/'),

  -- C programming notes
  ('C', 'C Programming Language Notes', 'https://www.learn-c.org/'),
  ('C', 'C Standard Library Reference', 'https://devdocs.io/c/'),
  ('C', 'C Programming Exercises', 'https://www.programiz.com/c-programming'),
  ('C', 'C Language Cheat Sheet', 'https://www.geeksforgeeks.org/c-programming-language/'),
  ('C', 'C Programming Interview Guide', 'https://www.tutorialspoint.com/cprogramming/'),

  -- C++ notes
  ('C++', 'C++ Reference Guide', 'https://en.cppreference.com/w/'),
  ('C++', 'C++ Tutorial Notes', 'https://www.learncpp.com/'),
  ('C++', 'Modern C++ Features Guide', 'https://www.modernescpp.com/'),
  ('C++', 'C++ Best Practices', 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines'),
  ('C++', 'C++ Interview Preparation', 'https://www.geeksforgeeks.org/cpp-programming/');