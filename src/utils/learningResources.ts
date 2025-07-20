interface YouTubePlaylist {
  title: string;
  url: string;
}

interface Notes {
  title: string;
  url: string;
}

interface LearningResources {
  youtube: YouTubePlaylist[];
  notes: Notes[];
}

export const learningResources: Record<string, LearningResources> = {
  'Python': {
    youtube: [
      { title: 'Python for Beginners', url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTskrapNbzXhwoFUiLCjGgY7' },
      { title: 'Python OOP', url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlXsIBIdSeYtc' }
    ],
    notes: [
      { title: 'Python Basics PDF', url: 'https://docs.python.org/3/tutorial/index.html' },
      { title: 'Python Advanced Guide', url: 'https://docs.python.org/3/reference/index.html' }
    ]
  },
  'C': {
    youtube: [
      { title: 'C Programming Tutorial', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRggZZgYpPMUxdY1CYkZtARR' },
      { title: 'Data Structures in C', url: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRj9lld8sWIUNwlKfdUoPd1Y' }
    ],
    notes: [
      { title: 'C Programming Notes', url: 'https://www.learn-c.org/' },
      { title: 'C Reference Guide', url: 'https://en.cppreference.com/w/c' }
    ]
  },
  'C++': {
    youtube: [
      { title: 'C++ Tutorial for Beginners', url: 'https://www.youtube.com/playlist?list=PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb' },
      { title: 'Modern C++', url: 'https://www.youtube.com/playlist?list=PLlrATfBNZ98fqE45g3jZA_hLGUrD4bo6_' }
    ],
    notes: [
      { title: 'C++ Notes', url: 'https://www.learncpp.com/' },
      { title: 'C++ Reference', url: 'https://en.cppreference.com/w/cpp' }
    ]
  }
};