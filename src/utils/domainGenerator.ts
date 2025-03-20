import axios from 'axios';

interface DomainSuggestion {
  name: string;
  tld: string;
  available: boolean;
  price?: number;
  renewPrice?: number;
}

interface NamesiloResponse {
  request: {
    operation: string;
    ip: string;
  };
  reply: {
    code: number;
    detail: string;
    available?: Array<{
      domain: string;
      price: number;
      renew: number;
      premium: number;
      duration: number;
    }>;
    unavailable?: string[];
  };
}

const CHAT_API_URL = 'https://api.siliconflow.cn/v1/chat/completions';
const CHAT_API_KEY = 'sk-jokgjisfdfidbxyfejgqmlmornxxbeutmbcimrrofyurwvqc';
const PROXY_URL = 'https://lookupwiz.com/api/check-domain';

async function checkDomainAvailability(domains: string[]): Promise<DomainSuggestion[]> {
  if (!domains.length) {
    return [];
  }

  try {
    const domainList = domains.join(',');
    const response = await axios.get<NamesiloResponse>(
      `${PROXY_URL}?domains=${domainList}`
    );

    if (!response.data?.reply?.code || response.data.reply.code !== 300) {
      throw new Error('Invalid response from domain availability service');
    }

    const availableDomains = new Map(
      (response.data.reply.available || []).map(domain => [
        domain.domain.toLowerCase(),
        { price: domain.price, renewPrice: domain.renew }
      ])
    );

    return domains.map(domain => {
      const domainLower = domain.toLowerCase();
      const lastDotIndex = domainLower.lastIndexOf('.');
      const name = domainLower.substring(0, lastDotIndex);
      const tld = domainLower.substring(lastDotIndex);
      
      const domainInfo = availableDomains.get(domainLower);

      return {
        name,
        tld,
        available: !!domainInfo,
        price: domainInfo?.price,
        renewPrice: domainInfo?.renewPrice
      };
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Domain availability check failed:', error.message);
      throw new Error('Unable to check domain availability. Please try again.');
    }
    throw error;
  }
}

function parseDomainNames(content: string): string[] {
  if (!content) return [];
  
  return content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && /^[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}$/.test(line))
    .slice(0, 50); // Limit to 50 domains to prevent overloading
}

export async function generateDomainSuggestions(input: string): Promise<DomainSuggestion[]> {
  try {
    const chatResponse = await axios.post(
      CHAT_API_URL,
      {
        model: "deepseek-ai/DeepSeek-V3",
        messages: [
          {
            role: "system",
            content: "You are a dedicated Domain Generation AI. Your goal is to generate creative domain names based on user-provided keywords or descriptions, rather than just simple word combinations. Your output must contain a set of 40–50 high-quality domain names that are concise, memorable, and brandable. You may use creative spellings, phonetics, abbreviations, and word combinations, incorporate industry-specific terms, and suggest unique domain extensions. The domain extensions must be valid and commonly used, including but not limited to: .com, .net, .org, .io, .ai, .tech, .xyz, .co, .dev, .store, .app, .info. If the user's query is unrelated to domains, treat it as a domain description. Your response must be a pure list of domain names with no additional explanations or text."
          },
          {
            role: "user",
            content: input
          }
        ],
        max_tokens: 4096
      },
      {
        headers: {
          'Authorization': `Bearer ${CHAT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!chatResponse.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from domain generation service');
    }

    const content = chatResponse.data.choices[0].message.content;
    const domainNames = parseDomainNames(content);

    if (!domainNames.length) {
      throw new Error('No valid domain names were generated. Please try a different search term.');
    }

    return await checkDomainAvailability(domainNames);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Domain generation failed:', error.message);
      throw new Error('Unable to generate domain suggestions. Please try again.');
    }
    throw error;
  }
}