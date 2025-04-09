# OneRoot Website

A mobile-first website to display available filters and pricing based on regions, connected to the OneRoot Supabase database.

## Overview

This website serves as a catalog to display filter information and pricing for different regions. It's designed to be highly mobile-optimized with smooth interactions and transitions, and it fetches real data from the Supabase database used by the OneRoot mobile app.

## Features

- Modern, clean, and visually appealing UI
- Mobile-optimized design
- Real-time data from Supabase
- Responsive grid showing:
  - Region name
  - Supporting images (if available)
  - List of available filters and their prices
- Sorting and filtering capabilities

## Tech Stack

- React
- TailwindCSS
- Supabase (for data fetching)
- Vite (for fast development and optimized builds)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

### Installation

```bash
# Navigate to the project directory
cd OneRoot-Website

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

## Mobile Optimization

This website is designed with a mobile-first approach, ensuring optimal performance and user experience on mobile devices.