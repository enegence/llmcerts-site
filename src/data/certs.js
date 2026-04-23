export const CERTS = [
  {vendor:'OpenAI', name:'AI Foundations', audience:'General / Job-ready', availability:'Limited', coding:false, focus:'General AI / LLM'},
  {vendor:'OpenAI', name:'OpenAI Certification', audience:'General', availability:'Limited', coding:false, focus:'General AI / Platform'},
  {vendor:'Anthropic', name:'Claude Certified Architect, Foundations', audience:'Architects', availability:'Partner', coding:true, focus:'Claude / Architecture'},
  {vendor:'Google', name:'Google Cloud Generative AI Leader', audience:'Business / Leadership', availability:'Public', coding:false, focus:'GenAI Strategy'},
  {vendor:'AWS', name:'AWS Certified AI Practitioner', audience:'Foundational', availability:'Public', coding:false, focus:'AI / ML / GenAI'},
  {vendor:'AWS', name:'AWS Certified Generative AI Developer – Professional', audience:'Developers', availability:'Public', coding:true, focus:'GenAI / Bedrock'},
  {vendor:'GitHub', name:'GitHub Copilot Certification', audience:'Developers', availability:'Public', coding:true, focus:'Copilot / AI Coding'},
  {vendor:'Microsoft', name:'Azure AI Fundamentals (AI-900)', audience:'Foundational', availability:'Public', coding:false, focus:'Azure AI'},
  {vendor:'Microsoft', name:'Azure AI Engineer Associate (AI-102)', audience:'Engineers', availability:'Public', coding:true, focus:'Azure AI Engineering'},
  {vendor:'Microsoft', name:'AI Business Professional', audience:'Business / Leaders', availability:'Public', coding:false, focus:'Business AI'},
  {vendor:'Microsoft', name:'AI Transformation Leader', audience:'Executives', availability:'Public', coding:false, focus:'AI Transformation'},
  {vendor:'Microsoft', name:'M365 Copilot & Agent Administration', audience:'Admins / IT', availability:'Public', coding:false, focus:'Copilot Admin'},
  {vendor:'NVIDIA', name:'Generative AI and LLMs Associate', audience:'Practitioners', availability:'Public', coding:false, focus:'LLMs / GenAI'},
  {vendor:'NVIDIA', name:'Generative AI LLMs Professional', audience:'Engineers', availability:'Public', coding:true, focus:'LLMs / GenAI'},
  {vendor:'Databricks', name:'Databricks Certified Generative AI Engineer Associate', audience:'Data / AI Engineers', availability:'Public', coding:true, focus:'GenAI Engineering'},
  {vendor:'Snowflake', name:'SnowPro Specialty: Gen AI', audience:'Data Practitioners', availability:'Public', coding:false, focus:'GenAI on Snowflake'},
  {vendor:'IBM', name:'IBM Certified watsonx Generative AI Engineer – Associate', audience:'Engineers', availability:'Public', coding:true, focus:'watsonx / GenAI'},
  {vendor:'Oracle', name:'Oracle Cloud Infrastructure Generative AI Professional', audience:'Engineers', availability:'Public', coding:true, focus:'OCI / GenAI'},
  {vendor:'SAP', name:'SAP Certified – SAP Generative AI Developer', audience:'Developers', availability:'Public', coding:true, focus:'SAP / GenAI'},
  {vendor:'Salesforce', name:'Salesforce Certified Agentforce Specialist', audience:'Admins / Builders', availability:'Public', coding:false, focus:'Agents / Salesforce'},
  {vendor:'UiPath', name:'Agentic Automation Associate', audience:'Automation Practitioners', availability:'Public', coding:false, focus:'Agents / Automation'},
];

export const VENDORS = ['All', ...Array.from(new Set(CERTS.map(c => c.vendor)))];

export const VENDOR_COLORS = {
  OpenAI:'#10A37F', Anthropic:'#D97706', Google:'#4285F4', AWS:'#FF9900',
  GitHub:'#24292E', Microsoft:'#00A4EF', NVIDIA:'#76B900', Databricks:'#FF3621',
  Snowflake:'#29B5E8', IBM:'#1F70C1', Oracle:'#F80000', SAP:'#0FAAFF',
  Salesforce:'#00A1E0', UiPath:'#FA4616',
};
