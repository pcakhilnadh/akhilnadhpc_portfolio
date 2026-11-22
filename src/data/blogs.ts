/**
 * Blogs Data
 * Contains blog posts with HTML content
 */

import type { BlogPost } from './types';

export type { BlogPost, BlogTag } from './types';

export const blogs: BlogPost[] = [
  {
    id: 'personal-journey-into-ml',
    title: 'My Journey into Machine Learning: From Curiosity to Career',
    slug: 'personal-journey-into-ml',
    author: 'Akhil Nadh PC',
    created_date: '2024-01-15',
    updated_date: '2024-01-15',
    tags: ['Personal'],
    excerpt: 'Discover how I transitioned into the fascinating world of machine learning and the lessons I learned along the way.',
    content: `
<div class="blog-content">
  <h1>My Journey into Machine Learning: From Curiosity to Career</h1>
  
  <p>When I started my career back in 2019, I never imagined that I would become a Lead Data Scientist working on cutting-edge AI solutions at one of the world's largest airlines. This is my story of how curiosity led me down the path of machine learning and how it transformed my career.</p>
  
  <h2>The Beginning: A Spark of Curiosity</h2>
  
  <p>It all started with a simple question: <strong>"How can we make computers intelligent?"</strong> This question haunted me during my college days, and I found myself spending countless hours watching online courses, reading research papers, and experimenting with simple datasets.</p>
  
  <p>The first project that truly captured my attention was building a simple image classifier using Python and TensorFlow. It was nothing fancy – just recognizing handwritten digits – but the moment I saw the model correctly classify a digit I had drawn, something clicked inside me. This was <em>real</em>, this was <em>powerful</em>, and this was what I wanted to do.</p>
  
  <h2>The Learning Phase</h2>
  
  <p>Here's what I learned during my initial learning phase:</p>
  
  <ul>
    <li><strong>Mathematics is fundamental:</strong> Understanding linear algebra, calculus, and probability is crucial</li>
    <li><strong>Practice beats theory:</strong> Reading about algorithms is nice, but implementing them taught me the real lessons</li>
    <li><strong>Failures are stepping stones:</strong> Most of my early models were terrible, but each failure taught me something valuable</li>
    <li><strong>Community matters:</strong> Engaging with the ML community through forums and open-source projects accelerated my learning</li>
  </ul>
  
  <h2>Breaking Into the Industry</h2>
  
  <p>My first role was in the <strong>automotive sector</strong>, where I worked on computer vision problems like drowsiness detection and collision prediction. This experience was invaluable because:</p>
  
  <blockquote>
    <p>"Real-world problems are messy. Your models need to handle incomplete data, production constraints, and business requirements that often conflict with technical ideals."</p>
  </blockquote>
  
  <p>I learned to build not just accurate models, but <em>production-ready</em> solutions. This meant:</p>
  
  <ol>
    <li>Optimizing models for inference speed and memory</li>
    <li>Implementing proper error handling and logging</li>
    <li>Creating robust pipelines that could handle edge cases</li>
    <li>Documenting my work for future maintenance</li>
  </ol>
  
  <h2>Evolution: From ML Engineer to Data Scientist</h2>
  
  <p>As I progressed in my career, I started taking on more responsibilities that went beyond just building models. I learned to:</p>
  
  <ul>
    <li>Translate business problems into ML solutions</li>
    <li>Communicate results to non-technical stakeholders</li>
    <li>Design end-to-end ML systems</li>
    <li>Lead and mentor junior team members</li>
  </ul>
  
  <p>This evolution was crucial in moving from a pure engineering role to a leadership position as a <strong>Lead Data Scientist</strong>.</p>
  
  <h2>Key Lessons I Wish I Knew Earlier</h2>
  
  <h3>1. Start with the Problem, Not the Solution</h3>
  
  <p>I used to get excited about using the latest and greatest algorithms. But I learned that the fanciest model is worthless if it doesn't solve the actual problem. Always start by understanding the business context and the data constraints.</p>
  
  <h3>2. Data Quality > Model Complexity</h3>
  
  <p>I've seen teams spend months perfecting a sophisticated model only to get mediocre results because the data quality was poor. Spending time on data cleaning, validation, and augmentation often yields better returns than optimizing the model architecture.</p>
  
  <h3>3. Reproducibility is Non-Negotiable</h3>
  
  <p>Version your data, your code, and your models. Future you (or your team members) will thank you. Use tools like DVC, MLflow, and Git to maintain reproducibility.</p>
  
  <h3>4. Continuous Learning is Essential</h3>
  
  <p>ML is one of the fastest-moving fields in tech. New techniques, frameworks, and best practices emerge constantly. Set aside regular time for learning – whether it's reading papers, taking courses, or experimenting with new tools.</p>
  
  <h2>Today: Leading the Charge</h2>
  
  <p>Now, as a Lead Data Scientist at Air India, I work on fascinating projects like:</p>
  
  <ul>
    <li><strong>Computer Vision:</strong> Queue analysis and passenger behavior tracking</li>
    <li><strong>NLP:</strong> LLM-powered document verification for passports and visas</li>
    <li><strong>Forecasting:</strong> Food waste prediction and volumetric analysis</li>
    <li><strong>Biometrics:</strong> Facial recognition for VIP passenger identification</li>
  </ul>
  
  <p>But perhaps the most rewarding part of my role is the opportunity to shape the next generation of ML engineers in my team. Sharing knowledge and guiding others through their own journeys is incredibly fulfilling.</p>
  
  <h2>Final Thoughts</h2>
  
  <p>My journey into machine learning has been nothing short of transformative. It's taken me from a curious student to a leader driving AI initiatives at a major organization. But it hasn't been a straight path – it's been filled with challenges, failures, and countless learning moments.</p>
  
  <p>To anyone considering a career in machine learning: <strong>The field rewards curiosity, persistence, and continuous learning.</strong> Start with problems you're passionate about, build foundational knowledge, and don't be afraid to fail. Your unique perspective and background will be your greatest asset.</p>
  
  <p>Here's to the journey ahead – for me, and for everyone else embarking on their ML adventure! 🚀</p>
</div>
    `,
    read_time: 12
  },
  {
    id: 'llm-fine-tuning-guide',
    title: 'Fine-tuning LLMs with LoRA: A Practical Guide',
    slug: 'llm-fine-tuning-guide',
    author: 'Akhil Nadh PC',
    created_date: '2024-02-20',
    updated_date: '2024-02-20',
    tags: ['Tech'],
    excerpt: 'Learn how to efficiently fine-tune large language models using Low-Rank Adaptation (LoRA) with practical examples.',
    content: `
<div class="blog-content">
  <h1>Fine-tuning LLMs with LoRA: A Practical Guide</h1>
  
  <p>With the rise of large language models (LLMs) like LLaMA, GPT-3, and others, fine-tuning has become a critical skill. However, fine-tuning these massive models is computationally expensive and impractical for most organizations. Enter <strong>LoRA (Low-Rank Adaptation)</strong> – a game-changing technique that makes fine-tuning efficient and accessible.</p>
  
  <h2>What is LoRA?</h2>
  
  <p>LoRA is a parameter-efficient fine-tuning method proposed by Microsoft researchers. Instead of fine-tuning all parameters of a large model, LoRA introduces trainable low-rank decomposition matrices to each layer of the transformer.</p>
  
  <p>The key insight is: <strong>The update to model weights can be represented by a low-rank matrix decomposition.</strong></p>
  
  <h2>Why Use LoRA?</h2>
  
  <ul>
    <li><strong>Reduced Memory Usage:</strong> Instead of storing gradients for billions of parameters, you only store low-rank updates</li>
    <li><strong>Faster Training:</strong> Significantly fewer parameters to train means faster convergence</li>
    <li><strong>Lower Storage:</strong> Fine-tuned models are much smaller (typically 1-10MB instead of several GBs)</li>
    <li><strong>Easy Deployment:</strong> Switch between different domain-specific models by just loading different LoRA weights</li>
  </ul>
  
  <h2>How LoRA Works</h2>
  
  <p>At its core, LoRA works by adding trainable weight matrices to the attention layers:</p>
  
  <blockquote>
    <p>W' = W₀ + ΔW = W₀ + BA</p>
  </blockquote>
  
  <p>Where:</p>
  
  <ul>
    <li><strong>W₀</strong> is the original pre-trained weight matrix (frozen)</li>
    <li><strong>B</strong> and <strong>A</strong> are trainable low-rank matrices</li>
    <li><strong>rank</strong> is typically small (8, 16, or 32)</li>
  </ul>
  
  <p>This way, you only need to train a small fraction of parameters while achieving comparable performance to full fine-tuning.</p>
  
  <h2>Practical Implementation</h2>
  
  <p>Here's a practical example using the <code>peft</code> library with LLaMA:</p>
  
  <pre><code class="language-python">from peft import get_peft_model, LoraConfig, TaskType
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load base model
model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Configure LoRA
lora_config = LoraConfig(
    r=8,  # Rank
    lora_alpha=16,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type=TaskType.CAUSAL_LM
)

# Apply LoRA to model
model = get_peft_model(model, lora_config)
print(model.print_trainable_parameters())

# Now train as normal
# Only the LoRA parameters will be updated
  </code></pre>
  
  <h2>Tips for Successful Fine-tuning</h2>
  
  <h3>1. Choose the Right Rank</h3>
  
  <p>Start with rank 8 or 16. Higher ranks allow more expressiveness but use more memory. For domain-specific tasks, 8-16 is usually sufficient.</p>
  
  <h3>2. Select Target Modules Carefully</h3>
  
  <p>You don't need to apply LoRA to every module. Attention projection layers (q_proj, v_proj) are usually sufficient. Adapting more modules increases memory usage without proportional gains.</p>
  
  <h3>3. Quality Data Matters</h3>
  
  <p>Fine-tuning with diverse, high-quality examples yields better results than fine-tuning with noisy data. Consider:</p>
  
  <ul>
    <li>Data cleaning and preprocessing</li>
    <li>Example diversity</li>
    <li>Proper formatting and instruction templates</li>
  </ul>
  
  <h3>4. Monitor Training Carefully</h3>
  
  <p>Track metrics like:</p>
  
  <ul>
    <li>Training loss</li>
    <li>Validation loss</li>
    <li>Task-specific metrics (BLEU, F1, accuracy)</li>
  </ul>
  
  <h2>Common Pitfalls to Avoid</h2>
  
  <ul>
    <li><strong>Over-fitting:</strong> Use validation data and early stopping</li>
    <li><strong>Rank too low:</strong> Model may underfit on complex tasks</li>
    <li><strong>Rank too high:</strong> Wasted memory and slower training without benefit</li>
    <li><strong>Poor learning rate:</strong> Start with 1e-4 or 1e-3 and adjust based on training curves</li>
  </ul>
  
  <h2>Conclusion</h2>
  
  <p>LoRA has democratized LLM fine-tuning, making it accessible to organizations and individuals without unlimited computational resources. Whether you're building domain-specific chatbots or specialized language models, LoRA is a technique worth mastering.</p>
</div>
    `,
    read_time: 8
  },
  {
    id: 'ml-interview-preparation',
    title: 'Preparing for ML Interview: Common Questions and How to Approach Them',
    slug: 'ml-interview-preparation',
    author: 'Akhil Nadh PC',
    created_date: '2024-03-10',
    updated_date: '2024-03-10',
    tags: ['InterviewEx', 'Tech'],
    excerpt: 'A comprehensive guide to preparing for machine learning interviews with real questions and effective strategies.',
    content: `
<div class="blog-content">
  <h1>Preparing for ML Interview: Common Questions and How to Approach Them</h1>
  
  <p>Interviewing for a machine learning or data science role can be daunting. You need to demonstrate not just theoretical knowledge, but also practical problem-solving skills and the ability to communicate complex concepts clearly.</p>
  
  <h2>Interview Formats</h2>
  
  <p>ML interviews typically consist of:</p>
  
  <ol>
    <li><strong>Screening Round:</strong> Phone call discussing background and experience (20-30 minutes)</li>
    <li><strong>Technical Round:</strong> ML fundamentals, algorithms, system design (60-90 minutes)</li>
    <li><strong>Case Study:</strong> Real-world problem solving with datasets (90-120 minutes)</li>
    <li><strong>System Design:</strong> Building ML systems at scale (60 minutes)</li>
  </ol>
  
  <h2>Technical Interview Categories</h2>
  
  <h3>1. Machine Learning Fundamentals</h3>
  
  <p><strong>Sample Question:</strong> Explain the difference between overfitting and underfitting, and how would you detect them?</p>
  
  <blockquote>
    <p><strong>How to Answer:</strong> Start with definitions, then discuss detection methods (cross-validation, learning curves), and finally strategies to handle each problem.</p>
  </blockquote>
  
  <h3>2. Algorithm Knowledge</h3>
  
  <p><strong>Sample Question:</strong> When would you use Random Forest over Gradient Boosting?</p>
  
  <blockquote>
    <p><strong>How to Answer:</strong> Compare aspects like interpretability, training time, hyperparameter sensitivity, and problem characteristics.</p>
  </blockquote>
  
  <h3>3. Statistics and Probability</h3>
  
  <p><strong>Sample Question:</strong> What does it mean for a variable to be normally distributed? How would you test for normality?</p>
  
  <blockquote>
    <p><strong>How to Answer:</strong> Explain the properties of normal distribution, mention statistical tests (Shapiro-Wilk, Kolmogorov-Smirnov), and discuss implications.</p>
  </blockquote>
  
  <h3>4. SQL and Data Manipulation</h3>
  
  <p><strong>Sample Question:</strong> Write a query to find the top 3 customers by revenue in the last quarter.</p>
  
  <blockquote>
    <p><strong>How to Answer:</strong> Write clean, efficient SQL with proper filtering, aggregation, and sorting. Explain your approach.</p>
  </blockquote>
  
  <h2>Case Study Interview Preparation</h2>
  
  <p>Case studies are where you demonstrate end-to-end problem solving. Here's a framework:</p>
  
  <h3>CRISP-DM Approach</h3>
  
  <ol>
    <li><strong>Business Understanding:</strong> What's the problem? What's success?</li>
    <li><strong>Data Understanding:</strong> Explore and profile the data</li>
    <li><strong>Data Preparation:</strong> Clean, transform, engineer features</li>
    <li><strong>Modeling:</strong> Train and evaluate models</li>
    <li><strong>Evaluation:</strong> Validate on test set and analyze results</li>
    <li><strong>Deployment:</strong> Discuss production considerations</li>
  </ol>
  
  <h2>System Design Interview</h2>
  
  <p><strong>Sample Question:</strong> Design a recommendation system for an e-commerce platform.</p>
  
  <p>Key considerations:</p>
  
  <ul>
    <li>Scalability (millions of users)</li>
    <li>Real-time vs batch processing</li>
    <li>Model architecture choices</li>
    <li>Feature engineering pipeline</li>
    <li>Monitoring and evaluation metrics</li>
    <li>Handling cold-start problems</li>
  </ul>
  
  <h2>Interview Tips and Tricks</h2>
  
  <h3>1. Think Out Loud</h3>
  
  <p>Interviewers want to see your thought process. Don't just give answers – explain your reasoning, assumptions, and considerations.</p>
  
  <h3>2. Ask Clarifying Questions</h3>
  
  <p>For ambiguous questions, ask for clarification before diving into a solution. This shows maturity and prevents wasted effort.</p>
  
  <h3>3. Discuss Trade-offs</h3>
  
  <p>There's rarely a "perfect" solution. Discuss trade-offs between accuracy and speed, complexity and interpretability, etc.</p>
  
  <h3>4. Prepare Examples from Your Experience</h3>
  
  <p>Use the STAR method (Situation, Task, Action, Result) to discuss past projects. Be ready to go deep on any project mentioned in your resume.</p>
  
  <h3>5. Code When Asked</h3>
  
  <p>If asked to write code, write clean, readable code with proper variable names and comments. It's okay to ask for syntax help if you're in a new environment.</p>
  
  <h2>Common Mistakes to Avoid</h2>
  
  <ul>
    <li><strong>Overcomplicating solutions:</strong> Start simple and add complexity if needed</li>
    <li><strong>Not discussing assumptions:</strong> Always state your assumptions explicitly</li>
    <li><strong>Ignoring edge cases:</strong> Think about edge cases and how your solution handles them</li>
    <li><strong>Forgetting about metrics:</strong> Always define how you'll measure success</li>
    <li><strong>Skipping the business context:</strong> Remember it's always about business value</li>
  </ul>
  
  <h2>Practice Resources</h2>
  
  <ul>
    <li><strong>LeetCode:</strong> SQL and coding problems</li>
    <li><strong>Kaggle:</strong> Real datasets and competitions</li>
    <li><strong>Cracking the ML Interview:</strong> Great book with case studies</li>
    <li><strong>Company-specific resources:</strong> Review their tech blogs and papers</li>
  </ul>
  
  <h2>Final Advice</h2>
  
  <p>ML interviews are designed to assess your problem-solving ability and communication skills, not just memorization. Focus on building a strong foundation, practicing with real problems, and being able to explain your solutions clearly. Good luck! 🎯</p>
</div>
    `,
    read_time: 10
  }
];

// Welcome text for blogs page
export const blogsWelcomeText = 'Thoughts on ML, AI, and career';

// Helper functions
export function getBlogById(id: string): BlogPost | undefined {
  return blogs.find(blog => blog.id === id);
}

export function getBlogsByTag(tag: string): BlogPost[] {
  return blogs.filter(blog => blog.tags.includes(tag as any));
}

export function getAllBlogTags(): string[] {
  const tags = new Set<string>();
  blogs.forEach(blog => {
    blog.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function searchBlogs(searchTerm: string): BlogPost[] {
  const term = searchTerm.toLowerCase();
  return blogs.filter(blog => 
    blog.title.toLowerCase().includes(term) ||
    blog.excerpt?.toLowerCase().includes(term) ||
    blog.content.toLowerCase().includes(term)
  );
}
