/**
 * The focus-area chips above the project grid, in display order. A project
 * belongs to an area when any of its domains, tags or stack items matches
 * one of the area's terms (case-insensitive). Areas that match no project
 * are hidden, so it is safe to list areas ahead of the projects that use them.
 */
export const PROJECT_AREAS: { label: string; terms: string[] }[] = [
  {
    label: "Generative AI",
    terms: ["Generative AI", "LLM", "Multimodal LLMs", "Vision LLM", "Azure OpenAI", "Gemini", "Claude", "LoRA", "Qwen (LoRA)"],
  },
  { label: "RAG", terms: ["RAG", "LlamaIndex", "ChromaDB", "PgVector", "Semantic Chunking", "Citations"] },
  { label: "Agentic AI", terms: ["Agentic AI", "Multi-Agent", "LangGraph"] },
  { label: "NLP", terms: ["NLP", "Text Classification", "TF-IDF", "Text-to-SQL", "Sentence Transformers"] },
  { label: "Document AI", terms: ["Document AI", "OCR", "Azure Document Intelligence", "Docling"] },
  { label: "Computer Vision", terms: ["Computer Vision", "Object Detection", "YOLOv8", "OpenCV", "EfficientNet", "MiDaS"] },
  { label: "ML & Deep Learning", terms: ["Machine Learning", "Deep Learning", "Scikit-learn", "SVM", "PyTorch", "TensorRT"] },
  { label: "MLOps & Cloud", terms: ["MLOps", "Cloud AI", "Edge AI", "Azure ML", "Azure Kubernetes Service", "Docker"] },
  { label: "Full-Stack", terms: ["Full-Stack Development", "Frontend Development", "React", "PWA"] },
];
