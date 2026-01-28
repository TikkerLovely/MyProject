// Load portfolio data from JSON
async function loadPortfolioData() {
    try {
        const response = await fetch('assets/data/portfolio.json');
        const data = await response.json();
        
        // Update personal info
        updatePersonalInfo(data.personal);
        updateHeroSection(data.personal);
        updateAboutSection(data.about);
        updateSkillsSection(data.skills);
        updateExperienceSection(data.experience);
        updateProjectsSection(data.projects);
        updateContactSection(data.personal);
        updateFooter(data.personal);
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
}

// Update personal info (logo, title)
function updatePersonalInfo(personal) {
    const logo = document.querySelector('.logo');
    if (logo) logo.textContent = personal.logo;
    
    const title = document.querySelector('title');
    if (title) title.textContent = `${personal.name} - Portfolio`;
}

// Update hero section
function updateHeroSection(personal) {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const nameSpan = heroTitle.querySelector('.highlight');
        if (nameSpan) nameSpan.textContent = personal.name;
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = personal.title;
    
    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = personal.description;
    
    // Update social links
    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    if (linkedinLink) linkedinLink.href = personal.linkedin;
}

// Update about section
function updateAboutSection(about) {
    const aboutTexts = document.querySelectorAll('.about-text p');
    about.paragraphs.forEach((para, index) => {
        if (aboutTexts[index]) aboutTexts[index].textContent = para;
    });
    
    const stats = document.querySelectorAll('.stat');
    about.stats.forEach((stat, index) => {
        if (stats[index]) {
            const h3 = stats[index].querySelector('h3');
            const p = stats[index].querySelector('p');
            if (h3) h3.textContent = stat.number;
            if (p) p.textContent = stat.label;
        }
    });
}

// Update skills section
function updateSkillsSection(skills) {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;
    
    skillsGrid.innerHTML = '';
    
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        let itemsHTML = '<ul>';
        skill.items.forEach(item => {
            itemsHTML += `<li>${item}</li>`;
        });
        itemsHTML += '</ul>';
        
        skillCard.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <h3>${skill.title}</h3>
            ${itemsHTML}
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Update experience section
function updateExperienceSection(experience) {
    const timeline = document.querySelector('.experience-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        let achievementsHTML = '<ul class="achievements">';
        exp.achievements.forEach(achievement => {
            achievementsHTML += `<li>${achievement}</li>`;
        });
        achievementsHTML += '</ul>';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <h3>${exp.position}</h3>
                <p class="company">${exp.company}</p>
                <p class="date">${exp.date}</p>
                ${achievementsHTML}
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Update projects section
function updateProjectsSection(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder">${project.emoji}</div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p class="tech-stack">${project.tech}</p>
                <p class="project-description">${project.description}</p>
                <div class="project-links">
                    <a href="#" class="project-link">Details</a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Update contact section
function updateContactSection(personal) {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) emailLink.href = `mailto:${personal.email}`;
    
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) phoneLink.href = `tel:${personal.phone}`;
    
    const locationText = document.querySelector('.contact-item:last-child p:last-of-type');
    if (locationText) locationText.textContent = personal.location;
    
    // Update social buttons
    const socialButtons = document.querySelectorAll('.social-button');
    if (socialButtons[0]) socialButtons[0].href = personal.linkedin;
    if (socialButtons[1]) socialButtons[1].href = `mailto:${personal.email}`;
    if (socialButtons[2]) socialButtons[2].href = `tel:${personal.phone}`;
}

// Update footer
function updateFooter(personal) {
    const footerText = document.querySelector('.footer-content p:first-child');
    if (footerText) footerText.textContent = `© 2024 ${personal.name}. All rights reserved.`;
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadPortfolioData);
