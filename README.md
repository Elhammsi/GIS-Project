# Bookcase Mapping Project in Berlin
## Overview
The Bookcase Mapping Project is a web application that allows users to add bookcases to a map of Berlin. This application ensures that any new bookcase added is within a 1000-meter radius of an existing bookcase, otherwise, an error is generated. All valid bookcases are saved in the database. The project uses Django and GeoDjango for the backend and HTML, CSS, JavaScript, Leaflet, and JSON for the interactive front end.
## Features
    • Add Bookcases: Users can add new bookcases to a map of Berlin.
    
    • Distance Validation: New bookcases must be within 1000 meters of an existing bookcase.
    
    • Interactive Map: The map is interactive, allowing users to visualize bookcase locations and distances.
    
    • Database Storage: Valid bookcase entries are saved in the database.
    
## Technologies Used
    • Backend:
    
        ◦ Django
        
        ◦ GeoDjango
        
    • Frontend:
    
        ◦ HTML
        
        ◦ CSS
        
        ◦ JavaScript
        
        ◦ Leaflet.js
        
    • Data Format:
    
        ◦ JSON
        
## Usage
Adding a Bookcase

    1. Navigate to the Add Bookcase Page: Use the navigation bar to go to the "Add Bookcase" page.
    
    2. Select a Location on the Map: Click on the map to choose the location for the new bookcase.
    
    3. Submit the Form: Fill in the required details and submit the form.
    
    4. Validation:
    
        ◦ If the bookcase is within 1000 meters of an existing bookcase, it will be added to the map and saved in the database.
        
        ◦ If the bookcase is not within 1000 meters of an existing bookcase, an error message will be displayed.
        
## Viewing Bookcases
    • The main page displays a map with all existing bookcases marked.
    
    • Click on any bookcase marker to view details about that bookcase.
    
## Key Files

    • bookcases/models.py: Defines the Bookcase model with geospatial fields.
    
    • bookcases/views.py: Contains view logic for adding and displaying bookcases.
    
    • bookcases/templates/: HTML templates for rendering the web pages.
    
    • bookcases/static/: Static files including CSS and JavaScript.
    
    • project/settings.py: Configuration for Django and GeoDjango.
    

