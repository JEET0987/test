import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { LLMChain } from 'langchain/chains';

class ColorMatchingService {
  constructor() {
    this.model = new OpenAI({
      openAIApiKey: process.env.REACT_APP_OPENAI_API_KEY,
      temperature: 0.7,
    });
  }

  async analyzeColor(hexColor) {
    try {
      const template = `
      You are a color expert. Analyze the following color and provide:
      1. Color name
      2. Color family (warm, cool, neutral)
      3. Complementary colors
      4. Similar colors in the same family
      5. Mood and psychological associations
      
      Color: {hexColor}
      
      Provide the response in JSON format with the following structure:
      {
        "name": "color name",
        "family": "color family",
        "complementary": ["hex1", "hex2"],
        "similar": ["hex1", "hex2", "hex3"],
        "mood": ["mood1", "mood2"],
        "associations": ["association1", "association2"]
      }
      `;

      const prompt = new PromptTemplate({
        template,
        inputVariables: ["hexColor"],
      });

      const chain = new LLMChain({
        llm: this.model,
        prompt,
      });

      const result = await chain.call({
        hexColor,
      });

      return JSON.parse(result.text);
    } catch (error) {
      console.error('Error in color analysis:', error);
      throw error;
    }
  }

  async findMatchingBalloons(hexColor, balloons) {
    try {
      const colorAnalysis = await this.analyzeColor(hexColor);
      
      const template = `
      Given the following color analysis and balloon inventory, find the best matching balloons.
      
      Color Analysis:
      {colorAnalysis}
      
      Balloon Inventory:
      {balloons}
      
      Provide the response in JSON format with the following structure:
      {
        "matches": [
          {
            "balloonId": "id",
            "matchScore": 0.95,
            "matchReason": "reason for match"
          }
        ]
      }
      `;

      const prompt = new PromptTemplate({
        template,
        inputVariables: ["colorAnalysis", "balloons"],
      });

      const chain = new LLMChain({
        llm: this.model,
        prompt,
      });

      const result = await chain.call({
        colorAnalysis: JSON.stringify(colorAnalysis),
        balloons: JSON.stringify(balloons),
      });

      return JSON.parse(result.text);
    } catch (error) {
      console.error('Error in balloon matching:', error);
      throw error;
    }
  }
}

export default new ColorMatchingService(); 