# 'Unnamed' Finance App

An unnamed web app for beautifully visualizing interesting connections in the market!

## What it does

Our project provides users with a sandbox where they can quickly build a network that displays relationships in the stock market. After logging into the platform, users are able to add any company listed on the NYSE and engage with them on an interactive relationship graph. When each new entity is added, our platform automatically calculates the correlation between its stock market history and all other nodes, creating green edges between positively correlated stocks and red edges between negatively correlated ones. At any time, a user can hover over any node in the graph to instantly see more information about the stock and drag around nodes to explore the model. Thus, the platform provides a unique and fun way to explore connections in the market!

## How we built it

When deciding on the tech stack for our project, some of the decisions were relatively straightforward; the frontend would be written in React as it was the framework most of our team was familiar with. The UI library (shadcn/ui) and backend (NodeJS+Typescript) followed suite. For deployment and authentication, however, we heavily deliberated "rolling" it ourselves. In the end though, we decided to take advantage of the combined platforms of Clerk and Convex, which made the overall process both quicker and easier. Thanks to Convex, we were also able to immediately start developing our user records with Convex's built-in database. Beyond this, we used freely available financial data from Yahoo to run our correlation model and developed our graph visualization with the help of the D3 JavaScript data visualization library.

## Challenges we ran into

One of the largest challenges our team ran into was integrating D3 (the diagram graphics library) with our frontend; one of React's key features is the use of a virtual document object model (DOM), which leads to impressive performance feats but poor interactions with certain libraries that deal directly with the DOM, such as D3. While wrapper libraries to make this process less painful exist, our frontend devs decided to undertake the challenge for the sake of learning the process. After a number of hours dealing with excessive re-renders, duplicate graph instances, and performance issues, we finally came upon a solution that renders efficiently, accurately, and with minimal latency.

## What we learned

Our project allowed everyone on our team to work with libraries, frameworks, and technologies they never had before. This was especially true regarding our project's use of the D3 JavaScript data visualization library, freely available stock market APIs, and the Convex full-stack Typescript development platform.

## What's next for our project

Given more time, we'd love to increase the number of types of relationships that our platform can model! We believe that displaying a wide variety of relationship types paired with the unique representation that our web app provides could reveal hidden relationships that help users better understand market trends.

## Launch Instructions

Run `npm run dev` in the `./web` folder to start a dev instance of the web app

Run `npm run build` in the `./web` folder to start a production instance of the web app