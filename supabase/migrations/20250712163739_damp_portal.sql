/*
  # Comprehensive Learning Resources

  1. New Tables Content
    - Extensive YouTube playlists for Python, C, and C++
    - Comprehensive programming notes and documentation
    - Covers beginner to advanced topics
    - Includes practical projects and interview preparation

  2. Content Organization
    - 15 YouTube resources per language (45 total)
    - 15 notes resources per language (45 total)
    - Structured learning paths from basics to advanced
*/

-- Clear existing data to avoid duplicates
DELETE FROM youtube_resources;
DELETE FROM notes_resources;

-- Python YouTube Resources
INSERT INTO youtube_resources (language, title, url) VALUES
('Python', 'Python Full Course for Beginners - Complete Tutorial', 'https://www.youtube.com/watch?v=_uQrJ0TkZlc'),
('Python', 'Python Object Oriented Programming (OOP) - Complete Course', 'https://www.youtube.com/watch?v=Ej_02ICOIgs'),
('Python', 'Python Data Structures and Algorithms Course', 'https://www.youtube.com/watch?v=pkYVOmU3MgA'),
('Python', 'Python Web Development with Django - Full Course', 'https://www.youtube.com/watch?v=F5mRW0jo-U4'),
('Python', 'Python Flask Tutorial - Complete Web Development Course', 'https://www.youtube.com/watch?v=Z1RJmh_OqeA'),
('Python', 'Python Data Science and Machine Learning Course', 'https://www.youtube.com/watch?v=rfscVS0vtbw'),
('Python', 'Python NumPy Tutorial - Complete Guide', 'https://www.youtube.com/watch?v=QUT1VHiLmmI'),
('Python', 'Python Pandas Tutorial - Data Analysis with Python', 'https://www.youtube.com/watch?v=vmEHCJofslg'),
('Python', 'Python Matplotlib Tutorial - Data Visualization', 'https://www.youtube.com/watch?v=3Xc3CA655Y4'),
('Python', 'Python GUI Development with Tkinter', 'https://www.youtube.com/watch?v=YXPyB4XeYLA'),
('Python', 'Python Automation and Scripting Course', 'https://www.youtube.com/watch?v=PXMJ6FS7llk'),
('Python', 'Python Testing with Pytest - Complete Guide', 'https://www.youtube.com/watch?v=cHYq1MRoyI0'),
('Python', 'Python Decorators and Generators Tutorial', 'https://www.youtube.com/watch?v=FsAPt_9Bf3U'),
('Python', 'Python Interview Questions and Coding Challenges', 'https://www.youtube.com/watch?v=DEwgZNC-KyE'),
('Python', 'Advanced Python Programming Concepts', 'https://www.youtube.com/watch?v=HGOBQPFzWKo');

-- C Programming YouTube Resources
INSERT INTO youtube_resources (language, title, url) VALUES
('C', 'C Programming Tutorial for Beginners - Complete Course', 'https://www.youtube.com/watch?v=KJgsSFOSQv0'),
('C', 'C Programming Pointers Explained - Complete Tutorial', 'https://www.youtube.com/watch?v=zuegQmMdy8M'),
('C', 'Data Structures in C Programming - Full Course', 'https://www.youtube.com/watch?v=B31LgI4Y4DQ'),
('C', 'C Programming Arrays and Strings Tutorial', 'https://www.youtube.com/watch?v=7mUHsLyY664'),
('C', 'C Programming Functions and Recursion', 'https://www.youtube.com/watch?v=kepBmgvWNDw'),
('C', 'C Programming File Handling Tutorial', 'https://www.youtube.com/watch?v=cEfTBygXQSs'),
('C', 'C Programming Memory Management - malloc and free', 'https://www.youtube.com/watch?v=lQP4X3odvHE'),
('C', 'C Programming Structures and Unions', 'https://www.youtube.com/watch?v=2BxbFxTmjdQ'),
('C', 'C Programming Linked Lists Implementation', 'https://www.youtube.com/watch?v=VOpjAHCee7c'),
('C', 'C Programming Sorting Algorithms Tutorial', 'https://www.youtube.com/watch?v=kPRA0W1kECg'),
('C', 'C Programming Debugging and Best Practices', 'https://www.youtube.com/watch?v=PfObAP7TEzM'),
('C', 'C Programming Projects for Beginners', 'https://www.youtube.com/watch?v=1uR4tL-OSNI'),
('C', 'Advanced C Programming Concepts', 'https://www.youtube.com/watch?v=Hc5qLyJwvDA'),
('C', 'C Programming Interview Questions and Answers', 'https://www.youtube.com/watch?v=qMiwRNrhMfY'),
('C', 'C Programming System Programming Tutorial', 'https://www.youtube.com/watch?v=9-IWMbJXoLM');

-- C++ Programming YouTube Resources
INSERT INTO youtube_resources (language, title, url) VALUES
('C++', 'C++ Programming Course - Beginner to Advanced', 'https://www.youtube.com/watch?v=vLnPwxZdW4Y'),
('C++', 'C++ Object Oriented Programming Tutorial', 'https://www.youtube.com/watch?v=wN0x9eZLix4'),
('C++', 'C++ Standard Template Library (STL) Tutorial', 'https://www.youtube.com/watch?v=RBSGKlAvoiM'),
('C++', 'Modern C++ Features (C++11/14/17/20)', 'https://www.youtube.com/watch?v=PNRju6_yn3o'),
('C++', 'C++ Pointers and Memory Management', 'https://www.youtube.com/watch?v=rtgwvkaYt1A'),
('C++', 'C++ Templates and Generic Programming', 'https://www.youtube.com/watch?v=I-hZkUa9mIs'),
('C++', 'C++ Exception Handling Tutorial', 'https://www.youtube.com/watch?v=0ojB8c0xUd8'),
('C++', 'C++ Multithreading and Concurrency', 'https://www.youtube.com/watch?v=LL8wkskDlbs'),
('C++', 'C++ Design Patterns Tutorial', 'https://www.youtube.com/watch?v=v9ejT8FO-7I'),
('C++', 'C++ Game Development with SFML', 'https://www.youtube.com/watch?v=PwuY2VcbLRs'),
('C++', 'C++ Data Structures and Algorithms', 'https://www.youtube.com/watch?v=B7hVxCmfPtM'),
('C++', 'C++ Smart Pointers Tutorial', 'https://www.youtube.com/watch?v=UOB7-B2MfwA'),
('C++', 'C++ Move Semantics and Perfect Forwarding', 'https://www.youtube.com/watch?v=pIzaZbKUw2s'),
('C++', 'C++ Interview Questions and Coding Challenges', 'https://www.youtube.com/watch?v=6ZKX7eTOqas'),
('C++', 'Advanced C++ Programming Techniques', 'https://www.youtube.com/watch?v=18c3MTX0PK0');

-- Python Notes Resources
INSERT INTO notes_resources (language, title, url) VALUES
('Python', 'Python Official Documentation - Complete Reference', 'https://docs.python.org/3/'),
('Python', 'Python Tutorial - W3Schools Interactive Guide', 'https://www.w3schools.com/python/'),
('Python', 'Real Python - In-depth Python Tutorials', 'https://realpython.com/'),
('Python', 'Python Crash Course - Book Resources', 'https://ehmatthes.github.io/pcc/'),
('Python', 'Python Data Science Handbook - Free Online', 'https://jakevdp.github.io/PythonDataScienceHandbook/'),
('Python', 'Automate the Boring Stuff with Python', 'https://automatetheboringstuff.com/'),
('Python', 'Python Notes for Professionals - Free PDF', 'https://goalkicker.com/PythonBook/'),
('Python', 'Python Programming Exercises and Solutions', 'https://www.w3resource.com/python-exercises/'),
('Python', 'Python Design Patterns Guide', 'https://python-patterns.guide/'),
('Python', 'Python Testing 101 - Complete Guide', 'https://realpython.com/python-testing/'),
('Python', 'Python Web Development with Django Documentation', 'https://docs.djangoproject.com/'),
('Python', 'Python Flask Documentation and Tutorial', 'https://flask.palletsprojects.com/'),
('Python', 'Python NumPy User Guide', 'https://numpy.org/doc/stable/user/'),
('Python', 'Python Pandas Documentation', 'https://pandas.pydata.org/docs/'),
('Python', 'Python Interview Questions - GeeksforGeeks', 'https://www.geeksforgeeks.org/python-interview-questions/');

-- C Programming Notes Resources
INSERT INTO notes_resources (language, title, url) VALUES
('C', 'C Programming Language Reference - cppreference', 'https://en.cppreference.com/w/c'),
('C', 'Learn C Programming - Interactive Tutorial', 'https://www.learn-c.org/'),
('C', 'C Programming Tutorial - Tutorialspoint', 'https://www.tutorialspoint.com/cprogramming/'),
('C', 'C Notes for Professionals - Free PDF', 'https://goalkicker.com/CBook/'),
('C', 'C Programming - GeeksforGeeks Complete Guide', 'https://www.geeksforgeeks.org/c-programming-language/'),
('C', 'The C Programming Language - K&R Book Resources', 'https://www.bell-labs.com/usr/dmr/www/'),
('C', 'C Programming Exercises and Solutions', 'https://www.w3resource.com/c-programming-exercises/'),
('C', 'C Data Structures Tutorial', 'https://www.tutorialspoint.com/data_structures_algorithms/'),
('C', 'C Programming Best Practices Guide', 'https://www.gnu.org/prep/standards/standards.html'),
('C', 'C Memory Management Tutorial', 'https://www.cprogramming.com/tutorial/c/lesson6.html'),
('C', 'C Pointers Tutorial - Complete Guide', 'https://www.tutorialspoint.com/cprogramming/c_pointers.htm'),
('C', 'C File Handling Tutorial', 'https://www.programiz.com/c-programming/c-file-input-output'),
('C', 'C Programming Interview Questions', 'https://www.interviewbit.com/c-interview-questions/'),
('C', 'C Programming Projects for Practice', 'https://www.thegeekstuff.com/2011/12/c-programming-projects/'),
('C', 'Advanced C Programming Concepts', 'https://www.embedded.com/advanced-c-programming/');

-- C++ Programming Notes Resources
INSERT INTO notes_resources (language, title, url) VALUES
('C++', 'C++ Reference Documentation - cppreference', 'https://en.cppreference.com/w/'),
('C++', 'Learn C++ - Comprehensive Tutorial', 'https://www.learncpp.com/'),
('C++', 'C++ Tutorial - W3Schools', 'https://www.w3schools.com/cpp/'),
('C++', 'C++ Notes for Professionals - Free PDF', 'https://goalkicker.com/CPlusPlusBook/'),
('C++', 'C++ Core Guidelines - Official Best Practices', 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines'),
('C++', 'Modern C++ Tutorial - GitHub Guide', 'https://github.com/changkun/modern-cpp-tutorial'),
('C++', 'C++ Programming - GeeksforGeeks', 'https://www.geeksforgeeks.org/c-plus-plus/'),
('C++', 'C++ STL Documentation and Examples', 'https://www.cplusplus.com/reference/stl/'),
('C++', 'C++ Object-Oriented Programming Guide', 'https://www.tutorialspoint.com/cplusplus/cpp_object_oriented.htm'),
('C++', 'C++ Templates Tutorial', 'https://www.cplusplus.com/doc/oldtutorial/templates/'),
('C++', 'C++ Exception Handling Guide', 'https://www.cplusplus.com/doc/tutorial/exceptions/'),
('C++', 'C++ Multithreading Tutorial', 'https://www.cplusplus.com/reference/thread/'),
('C++', 'C++ Design Patterns Implementation', 'https://refactoring.guru/design-patterns/cpp'),
('C++', 'C++ Interview Questions and Answers', 'https://www.interviewbit.com/cpp-interview-questions/'),
('C++', 'Advanced C++ Programming Techniques', 'https://www.modernescpp.com/');