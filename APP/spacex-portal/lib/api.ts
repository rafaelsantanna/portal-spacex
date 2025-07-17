// SpaceX API utility functions

const SPACEX_API_BASE = 'https://api.spacexdata.com/v4';

export async function fetchLaunches(limit?: number) {
  const url = limit 
    ? `${SPACEX_API_BASE}/launches?limit=${limit}`
    : `${SPACEX_API_BASE}/launches`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch launches: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchUpcomingLaunches(limit?: number) {
  const url = limit 
    ? `${SPACEX_API_BASE}/launches/upcoming?limit=${limit}`
    : `${SPACEX_API_BASE}/launches/upcoming`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch upcoming launches: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchPastLaunches(limit?: number) {
  const url = limit 
    ? `${SPACEX_API_BASE}/launches/past?limit=${limit}`
    : `${SPACEX_API_BASE}/launches/past`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch past launches: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchRockets() {
  const response = await fetch(`${SPACEX_API_BASE}/rockets`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch rockets: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchCompanyInfo() {
  const response = await fetch(`${SPACEX_API_BASE}/company`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch company info: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchLaunchById(id: string) {
  const response = await fetch(`${SPACEX_API_BASE}/launches/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch launch: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchRocketById(id: string) {
  const response = await fetch(`${SPACEX_API_BASE}/rockets/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch rocket: ${response.statusText}`);
  }
  
  return response.json();
}