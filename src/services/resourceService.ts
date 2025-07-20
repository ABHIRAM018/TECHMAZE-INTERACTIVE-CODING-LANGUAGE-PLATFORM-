import { supabase } from '../lib/supabase';

export interface Resource {
  id: string;
  language: string;
  title: string;
  url: string;
  keywords?: string[];
  description?: string;
  duration?: string;
  resource_type?: string;
  created_at?: string;
}

const defaultYouTubeResources = {
  'Python': [
    {
      title: 'Python Full Course for Beginners',
      url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
      description: 'Complete Python tutorial covering all the basics to advanced concepts',
      duration: '6 hours'
    },
    {
      title: 'Python OOP Tutorial - Object Oriented Programming',
      url: 'https://www.youtube.com/watch?v=ZDa-Z5JzLYM',
      description: 'Learn Object-Oriented Programming in Python with practical examples',
      duration: 'Series'
    },
    {
      title: 'Python Data Structures and Algorithms',
      url: 'https://www.youtube.com/watch?v=kQDxmjfkIKY',
      description: 'Master data structures and algorithms using Python',
      duration: 'Series'
    },
    {
      title: 'Python Web Development with Django',
      url: 'https://www.youtube.com/watch?v=F5mRW0jo-U4',
      description: 'Build web applications using Python and Django framework',
      duration: '4 hours'
    },
    {
      title: 'Python for Data Science and Machine Learning',
      url: 'https://www.youtube.com/watch?v=WFr2WgN9_xE',
      description: 'Learn Python libraries for data science: NumPy, Pandas, Matplotlib',
      duration: 'Series'
    }
  ],
  'C': [
    {
      title: 'C Programming for Beginners',
      url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
      description: 'Complete C programming course from basics to advanced',
      duration: '4 hours'
    },
    {
      title: 'Data Structures using C',
      url: 'https://www.youtube.com/watch?v=B31LgI4Y4DQ',
      description: 'Implementation of data structures in C programming',
      duration: 'Series'
    },
    {
      title: 'Pointers in C Programming',
      url: 'https://www.youtube.com/watch?v=zuegQmMdy8M',
      description: 'Deep dive into pointers and memory management in C',
      duration: '3 hours'
    },
    {
      title: 'C Programming Projects',
      url: 'https://www.youtube.com/watch?v=1uR4tL-OSNI',
      description: 'Build real-world projects using C programming',
      duration: 'Series'
    },
    {
      title: 'Advanced C Programming Concepts',
      url: 'https://www.youtube.com/watch?v=Hc5qLyJwvDA',
      description: 'Advanced topics in C programming language',
      duration: 'Series'
    }
  ],
  'C++': [
    {
      title: 'C++ Programming Course',
      url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
      description: 'Comprehensive C++ programming tutorial for beginners',
      duration: '4 hours'
    },
    {
      title: 'C++ Object-Oriented Programming',
      url: 'https://www.youtube.com/watch?v=wN0x9eZLix4',
      description: 'Learn OOP concepts in C++ with examples',
      duration: 'Series'
    },
    {
      title: 'Modern C++ Features',
      url: 'https://www.youtube.com/watch?v=PNRju6_yn3o',
      description: 'New features in Modern C++ (C++11, C++14, C++17)',
      duration: 'Series'
    },
    {
      title: 'C++ STL Tutorial',
      url: 'https://www.youtube.com/watch?v=RBSGKlAvoiM',
      description: 'Standard Template Library in C++ programming',
      duration: '5 hours'
    },
    {
      title: 'C++ Game Development',
      url: 'https://www.youtube.com/watch?v=PwuY2VcbLRs',
      description: 'Create games using C++ programming',
      duration: 'Series'
    }
  ],
  'Go': [
    {
      title: 'Go Programming Complete Course',
      url: 'https://www.youtube.com/watch?v=YS4e4q9oBaU',
      description: 'Complete Go programming tutorial from basics to advanced',
      duration: '7 hours'
    },
    {
      title: 'Go Concurrency Patterns',
      url: 'https://www.youtube.com/watch?v=f6kdp27TYZs',
      description: 'Master goroutines, channels, and concurrency in Go',
      duration: 'Series'
    },
    {
      title: 'Building Web APIs with Go',
      url: 'https://www.youtube.com/watch?v=SonwZ6MF5BE',
      description: 'Create REST APIs and web services using Go',
      duration: '4 hours'
    },
    {
      title: 'Go Microservices Tutorial',
      url: 'https://www.youtube.com/watch?v=VzBGi_n65iU',
      description: 'Build microservices architecture with Go',
      duration: 'Series'
    },
    {
      title: 'Go Testing and Benchmarking',
      url: 'https://www.youtube.com/watch?v=ndmB0bj7eyw',
      description: 'Learn testing best practices in Go',
      duration: '2 hours'
    }
  ]
};

const defaultNotesResources = {
  'Python': [
    {
      title: 'Python Official Documentation',
      url: 'https://docs.python.org/3/',
      description: 'The official Python programming language documentation',
      resource_type: 'Document'
    },
    {
      title: 'Python for Everybody',
      url: 'https://www.py4e.com/lessons',
      description: 'Free Python programming course materials and notes',
      resource_type: 'Document'
    },
    {
      title: 'Python Crash Course Notes',
      url: 'https://ehmatthes.github.io/pcc/',
      description: 'Comprehensive notes from Python Crash Course book',
      resource_type: 'Document'
    },
    {
      title: 'Real Python Tutorials',
      url: 'https://realpython.com/',
      description: 'In-depth Python programming tutorials and articles',
      resource_type: 'Document'
    },
    {
      title: 'Python Data Science Handbook',
      url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
      description: 'Complete guide to Python data science libraries',
      resource_type: 'Document'
    }
  ],
  'C': [
    {
      title: 'C Programming Language Reference',
      url: 'https://en.cppreference.com/w/c',
      description: 'Complete C language reference documentation',
      resource_type: 'Document'
    },
    {
      title: 'C Notes for Professionals',
      url: 'https://goalkicker.com/CBook/',
      description: 'Comprehensive C programming notes and examples',
      resource_type: 'PDF'
    },
    {
      title: 'C Programming Tutorial',
      url: 'https://www.learn-c.org/',
      description: 'Interactive C programming tutorial with examples',
      resource_type: 'Document'
    },
    {
      title: 'GeeksforGeeks C Programming',
      url: 'https://www.geeksforgeeks.org/c-programming-language/',
      description: 'Collection of C programming articles and tutorials',
      resource_type: 'Document'
    },
    {
      title: 'C Data Structures Notes',
      url: 'https://www.tutorialspoint.com/data_structures_algorithms/',
      description: 'Data structures implementation in C',
      resource_type: 'Document'
    }
  ],
  'C++': [
    {
      title: 'C++ Reference',
      url: 'https://en.cppreference.com/w/',
      description: 'Official C++ reference documentation',
      resource_type: 'Document'
    },
    {
      title: 'C++ Notes for Professionals',
      url: 'https://goalkicker.com/CPlusPlusBook/',
      description: 'Comprehensive C++ programming guide',
      resource_type: 'PDF'
    },
    {
      title: 'Modern C++ Tutorial',
      url: 'https://github.com/changkun/modern-cpp-tutorial',
      description: 'Modern C++ features and best practices',
      resource_type: 'Document'
    },
    {
      title: 'C++ Core Guidelines',
      url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines',
      description: 'Official C++ best practices and guidelines',
      resource_type: 'Document'
    },
    {
      title: 'Learn C++',
      url: 'https://www.learncpp.com/',
      description: 'Structured C++ programming tutorial',
      resource_type: 'Document'
    }
  ]
};

async function ensureDefaultResources() {
  try {
    // Check if resources exist
    const { data: youtubeCount } = await supabase
      .from('youtube_resources')
      .select('id', { count: 'exact' });
    
    const { data: notesCount } = await supabase
      .from('notes_resources')
      .select('id', { count: 'exact' });

    // Add default YouTube resources if none exist
    if (!youtubeCount || youtubeCount.length === 0) {
      for (const [language, resources] of Object.entries(defaultYouTubeResources)) {
        for (const resource of resources) {
          await createYouTubeResource({
            language,
            ...resource,
            keywords: resource.title.toLowerCase().split(' ').filter(word => word.length > 3)
          });
        }
      }
    }

    // Add default Notes resources if none exist
    if (!notesCount || notesCount.length === 0) {
      for (const [language, resources] of Object.entries(defaultNotesResources)) {
        for (const resource of resources) {
          await createNotesResource({
            language,
            ...resource,
            keywords: resource.title.toLowerCase().split(' ').filter(word => word.length > 3)
          });
        }
      }
    }
  } catch (error) {
    console.error('Error ensuring default resources:', error);
  }
}

export async function fetchYouTubeResources(language: string): Promise<Resource[]> {
  try {
    await ensureDefaultResources();

    let query = supabase
      .from('youtube_resources')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (language !== 'all') {
      query = query.eq('language', language);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching YouTube resources:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Supabase request failed', error);
    throw error;
  }
}

export async function fetchNotesResources(language: string): Promise<Resource[]> {
  try {
    await ensureDefaultResources();

    let query = supabase
      .from('notes_resources')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (language !== 'all') {
      query = query.eq('language', language);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching notes resources:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Supabase request failed', error);
    throw error;
  }
}

export async function createYouTubeResource(resource: Omit<Resource, 'id' | 'created_at'>) {
  const resourceWithKeywords = {
    ...resource,
    keywords: resource.keywords || resource.title.toLowerCase().split(' ').filter(word => word.length > 3),
    description: resource.description || `A curated video resource for learning ${resource.language} programming.`,
    duration: resource.duration || 'Playlist'
  };

  const { error } = await supabase
    .from('youtube_resources')
    .insert([resourceWithKeywords]);

  if (error) {
    console.error('Error creating YouTube resource:', error);
    throw error;
  }
}

export async function createNotesResource(resource: Omit<Resource, 'id' | 'created_at'>) {
  const resourceWithKeywords = {
    ...resource,
    keywords: resource.keywords || resource.title.toLowerCase().split(' ').filter(word => word.length > 3),
    description: resource.description || `A comprehensive learning resource for ${resource.language} programming.`,
    resource_type: resource.resource_type || (resource.url.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Document')
  };

  const { error } = await supabase
    .from('notes_resources')
    .insert([resourceWithKeywords]);

  if (error) {
    console.error('Error creating notes resource:', error);
    throw error;
  }
}

export async function updateYouTubeResource(id: string, resource: Partial<Resource>) {
  const updateData = { ...resource };
  if (resource.title && !resource.keywords) {
    updateData.keywords = resource.title.toLowerCase().split(' ').filter(word => word.length > 3);
  }

  const { error } = await supabase
    .from('youtube_resources')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating YouTube resource:', error);
    throw error;
  }
}

export async function updateNotesResource(id: string, resource: Partial<Resource>) {
  const updateData = { ...resource };
  if (resource.title && !resource.keywords) {
    updateData.keywords = resource.title.toLowerCase().split(' ').filter(word => word.length > 3);
  }
  
  if (resource.url && !resource.resource_type) {
    updateData.resource_type = resource.url.toLowerCase().endsWith('.pdf') ? 'PDF' : 'Document';
  }

  const { error } = await supabase
    .from('notes_resources')
    .update(updateData)
    .eq('id', id);

  if (error) {
    console.error('Error updating notes resource:', error);
    throw error;
  }
}

export async function deleteYouTubeResource(id: string) {
  const { error } = await supabase
    .from('youtube_resources')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting YouTube resource:', error);
    throw error;
  }
}

export async function deleteNotesResource(id: string) {
  const { error } = await supabase
    .from('notes_resources')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting notes resource:', error);
    throw error;
  }
}

export async function findRelatedResources(language: string, topic: string): Promise<{youtube: Resource[], notes: Resource[]}> {
  const keywords = topic.toLowerCase().split(' ').filter(word => word.length > 3);
  
  try {
    const [youtubeData, notesData] = await Promise.all([
      fetchYouTubeResources(language),
      fetchNotesResources(language)
    ]);
    
    const matchedYoutube = youtubeData.filter(resource => 
      keywords.some(keyword => 
        resource.title.toLowerCase().includes(keyword)
      )
    );
    
    const matchedNotes = notesData.filter(resource => 
      keywords.some(keyword => 
        resource.title.toLowerCase().includes(keyword)
      )
    );
    
    return {
      youtube: matchedYoutube.slice(0, 2),
      notes: matchedNotes.slice(0, 2)
    };
  } catch (error) {
    console.error('Error finding related resources:', error);
    return { youtube: [], notes: [] };
  }
}