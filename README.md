# Coding Inspo Generator
Feeling uninspired? Want to code, but can't think of anything to make?\
Use the Coding Inspo Generator!\
The Coding Inspo Generator (for lack of a better name as of now) will generate for you a broad topic upon which you can base a project, as well as three suggestions for potential projects pertaining to the project.\
<sub>**For example, if the broad topic is Time Management, some suggestions may include "Pomodoro timer", "To-do list", and "Simple scheduler".</sub>

First time using React (with Vite) + Tailwind!! I'm pretty proud of myself!\
I had to recreate this project twice (make a new project and copy+paste all the code) since I kept getting bugs, and in the process of trying to fix them, ended up completely breaking vite lmaoo

## Features
Parameter toggles
- Project complexity: Beginner/Intermediate/Advanced
- Time commitment: Around an hour/A day or two/Around a week
AI-Generated coding project ideas
- Broad topic
- More specific ideas
Simple walkthroughs on specific ideas

## How to Use
Change the settings based on your current skill level and how much time you'd like to commit to the project.\
Click the "generate" button to generate some coding ideas based on your settings.\
<sub>These will display on the right side of the screen.</sub>
From there, you have three options.\
- Like the topic, but not the suggestions? Click "refresh suggestions" to get three new project ideas.
- Found a suggestion you like, but don't know where to begin? Just click on the suggestion, and receive a brief AI-generated walkthrough to help you get started.\
- Want a different topic? Click "generate" to refresh everything.
That's it!

## Tools Used
Frontend:
- React
- TailwindCSS
Backend:
- Node
- Express

+GeminiAPI, Axios for api requests

## Current Bugs
Since this project relies so greatly on GeminiAPI to keep it functional, there may be some problems that arise. For the msot part, these are a result of GeminiAPI bugging out and not something I can fix directly.\
Some bugs include:
- "Refresh suggestions" seemingly generating the same suggestions, but worded differently
- Data simply failing to generate + throwing an error --> this is a 503 'service unavailable' error that is totally out of my control-- you'll just have to wait a little while and then try again
Rest assured that I am trying to find a fix for these, but it may be near-impossible since, again, they're out of my control.

## Running Locally

