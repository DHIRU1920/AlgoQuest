const axios = require('axios');

const getRandomEasyProblem = async (req, res) => {
  try {
    console.log('Fetching random easy problem...');
    
    // Fallback sample problems if API fails
    const sampleEasyProblems = [
      {
        title: "Two Sum",
        titleSlug: "two-sum",
        difficulty: "Easy",
        tags: ["Array", "Hash Table", "Math"]
      },
      {
        title: "Valid Parentheses",
        titleSlug: "valid-parentheses",
        difficulty: "Easy", 
        tags: ["String", "Stack"]
      },
      {
        title: "Best Time to Buy and Sell Stock",
        titleSlug: "best-time-to-buy-and-sell-stock",
        difficulty: "Easy",
        tags: ["Array", "Dynamic Programming"]
      },
      {
        title: "Contains Duplicate",
        titleSlug: "contains-duplicate",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"]
      },
      {
        title: "Maximum Subarray",
        titleSlug: "maximum-subarray",
        difficulty: "Easy",
        tags: ["Array", "Divide and Conquer"]
      }
    ];

    let problems = sampleEasyProblems;

    // Try to fetch from external API first
    try {
      const response = await axios.get('https://leetcode-api-faisalshohag.vercel.app/all', {
        timeout: 5000,
        headers: {
          'User-Agent': 'Interview-Prep-Tracker/1.0'
        }
      });
      
      console.log('External API response received');
      
      // If we get valid array data, use it
      if (response.data && Array.isArray(response.data)) {
        problems = response.data.filter(problem => {
          const difficulty = problem.difficulty || problem.level || problem.difficultyLevel;
          return difficulty && difficulty.toLowerCase() === 'easy';
        });
        console.log('Using external API, found', problems.length, 'easy problems');
      }
    } catch (apiError) {
      console.log('External API failed, using sample problems:', apiError.message);
      // Use sample problems as fallback
    }

    if (problems.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No easy problems found'
      });
    }

    // Randomly select one problem
    const randomIndex = Math.floor(Math.random() * problems.length);
    const selectedProblem = problems[randomIndex];

    console.log('Selected problem:', selectedProblem.title);

    // Format the response
    const formattedProblem = {
      title: selectedProblem.title || selectedProblem.questionTitle || selectedProblem.name || 'Unknown Title',
      difficulty: selectedProblem.difficulty || selectedProblem.level || selectedProblem.difficultyLevel || 'Easy',
      link: `https://leetcode.com/problems/${selectedProblem.titleSlug || selectedProblem.slug || 'unknown'}/`,
      tags: Array.isArray(selectedProblem.tags) ? selectedProblem.tags : 
             Array.isArray(selectedProblem.topicTags) ? selectedProblem.topicTags.map(tag => tag.name || tag) :
             Array.isArray(selectedProblem.topics) ? selectedProblem.topics : []
    };

    res.status(200).json({
      success: true,
      data: formattedProblem
    });

  } catch (error) {
    console.error('Error fetching random problem:', error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch problem'
    });
  }
};

module.exports = {
  getRandomEasyProblem,
};
