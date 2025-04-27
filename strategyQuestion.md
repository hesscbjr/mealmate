# Strategy Question

I absolutely agree with your premise. Just like the internet boom wasn't just about the tech itself but how it reshaped existing industries, AI's power lies in applying it intelligently to problems we already face.

## Virtual Design Construction

My first job out of college was working on a startup that spun out of a construction company in the electrical contracting business. I was surprised by how low tech much of the operation was. Part of this stemmed from an older workforce, but it was also clear they were fundamentally underserved by software and the tools they _did_ have often felt like clunky versions of Excel, ill-suited for the complexity of their work and plagued with loading spinners.

However, there was one exception, the Virtual Design and Construction (VDC) team. They worked with great software like Autodesk Revit to create 3D models for projects. But even here, while the _software_ was quality, they were incredibly underserved by _AI_. The process was still incredibly manual. I saw firsthand how their team spent painstaking hours meticulously routing every pipe and electrical conduit through complex models of buildings. They constantly checked for potential clashes with other VDC teams from other trades (plumbing, HVAC, etc.) and double checked compliance with code books. Every oversight had a real-world consequences and cost. Existing tools like clash detection help, but they're fundamentally reactive. They only find problems _after_ the design is laid out. The crucial, intensive work of mapping out these complex buildings remained primarily manual, with virtually no AI assistance in sight.

## The AI Opportunity

I believe a "Cursor for VDC" could have huge speed and cost benefits to these teams. Instead of spending hours dragging elements across a screen, an engineer could simply state their intent:

> "Route electrical conduits from Room A to Room B. Make sure to avoid the main HVAC trunk line and maintain clearances according to the 2024 National Electrical Code."

The AI could read parts of the project, understand the locations of the work from other VDC teams, analyze the code book for the location of the project, and generate an element in the model that fit what the user needs. Much like vibe coding, the engineer remains the expert, but their starting point is vastly accelerated.

## Why This Works

Revit models, under the hood, are just code. They're structured, logical descriptions of how a building comes together. This structured nature is key.

LLMs excel at generating code because code has rules, structure, and can be verified. Similarly, Revit models can be automatically checked for clashes, code compliance, and other constraints. This verifiability opens the door for reinforcement learning. The AI can generate layouts, receive feedback based on automated checks (and engineer review), and progressively improve just like how AI learned to code through reinforcement learning with human feedback.

## The Challenges (and the Moat)

Sourcing enough high-quality, labeled Revit model data for training is a significant hurdle. The required precision is also far beyond typical generative tasks because "close enough" doesn't work when you're designing building infrastructure (or vibe coding for that matter).

Additionally, context coherence comes into play here. Large files may be hundreds of thousands of lines of code. In a model where you need absolute precision, current LLMs would struggle to work on large enough projects similarly to their limitations in large codebases today.

But these challenges also create a significant competitive advantage. Solving the data problem and achieving the necessary precision builds a powerful moat. I imagine this would come from an incumbent like AutoDesk, however, a more novel approach to the structure of the underlying 3D model may allow LLMs to more easily generate it.

On top of that, model context coherence seems to improving every week making them more and more applicable to long context tasks like this. The resulting product could significantly improve the speed of VDC teams, allowing those sub contractors to win more bids with lower prices, work on more projects at once, and ultimately make more money.

## The Big Picture

As I mentioned above, construction is underserved by technology, particularly software. I find that the amount an industry is served by software is directly correlated with the overlap in software engineers exposed to the field. I don't think I am reaching when I say that the venn diagram of construction company employees and software engineers likely has a small overlap.

Cursor, was the eye opener to the real world applications of AI integrated products that drastically changed how software is written. The tools naturally came to software developers first because the overlap of sofware developers and sofwtare developers is everyone.

If you told me two years ago, I was going to build an entire app in two days for a job interview and AI would help me the whole way, I would've laughed.

As I look at 3D generation AI tools today, I can't help but think about the first examples I saw of AI code generation really working. [This video](https://x.com/sharifshameem/status/1284095222939451393), was from July 2020.

I believe the construction industry, particular the work done by VDC teams is at a similar point. In a few years, I wouldn't be shocked if we have a full "Cursor for VDC" and even tools like v0 or Lovable that spin up entire small projects from scratch for construction companies.

Overall, industries that are currently underserved by technology will lag, however, they have the most potential to be impacted by AI because they can leap frog the entire process of being served by sofware, and go directly from drawing sketches on paper, to have an AI assistant that can build 3D models for them.
