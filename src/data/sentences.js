// Curated English text database for the "English Learning Track".
// Organized by difficulty level. Each level is an array of short passages
// so the typing engine can pick one at random (or cycle through them).

export const sentences = {
  beginner: [
    "The cat sat on the mat and looked at the door.",
    "I like to read books when it is raining outside.",
    "She walks to school every morning with her dog.",
    "We eat lunch at noon and dinner in the evening.",
    "The sun is bright and the sky is very blue today.",
    "He plays with his toys after he finishes his food.",
    "My mother makes tea every day before breakfast.",
    "The small bird flew from one tree to another tree.",
    "They went to the park to play with a red ball.",
    "It is fun to learn new words every single day.",
  ],
  intermediate: [
    "Learning a new language requires patience, consistent practice, and a genuine curiosity about how people communicate.",
    "The old lighthouse stood at the edge of the cliff, warning ships away from the rocky shoreline below.",
    "Despite the heavy rain, the volunteers continued planting trees along the riverbank until the sun went down.",
    "Effective communication depends not only on the words we choose but also on how carefully we listen.",
    "The museum's newest exhibit explores how ancient civilizations tracked time using shadows, water, and the stars.",
    "Remote work has changed the way teams collaborate, pushing companies to rethink meetings, deadlines, and trust.",
    "A balanced diet, regular exercise, and enough sleep are often cited as the foundation of long-term health.",
    "The negotiation lasted well into the night, with both sides refusing to compromise on the final terms.",
    "Climate scientists rely on decades of data to understand how global temperatures shift over time.",
    "The novelist spent three years researching before writing a single chapter of her historical fiction.",
  ],
  advanced: [
    "The epistemological implications of quantum indeterminacy continue to provoke debate among physicists and philosophers who disagree about what, if anything, exists prior to observation.",
    "Bureaucratic inertia, compounded by conflicting jurisdictional mandates, frequently undermines the implementation of otherwise well-intentioned regulatory reforms.",
    "Her dissertation interrogates the paradoxical relationship between technological acceleration and the erosion of sustained, contemplative attention.",
    "The treaty's ambiguous phrasing regarding territorial sovereignty subsequently became the pretext for decades of diplomatic dispute.",
    "Neuroplasticity research suggests that the adult brain retains a surprising capacity for structural reorganization following injury or sustained practice.",
    "The playwright's late works are characterized by a deliberate rejection of linear narrative in favor of fragmented, simultaneous perspectives.",
    "Macroeconomic forecasting remains an inexact science, hampered by reflexivity: the models themselves influence the behavior they attempt to predict.",
    "Postcolonial scholars have interrogated the extent to which inherited administrative boundaries continue to shape contemporary ethnic conflict.",
    "The algorithm's apparent objectivity conceals a series of upstream human decisions about which variables merit inclusion in the first place.",
    "Constitutional originalism and living-constitutionalism represent fundamentally divergent theories about the proper role of judicial interpretation over time.",
  ],
};

export const getRandomSentence = (level = "beginner") => {
  const pool = sentences[level] || sentences.beginner;
  return pool[Math.floor(Math.random() * pool.length)];
};
