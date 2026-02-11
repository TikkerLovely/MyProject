(() => {
    const DATA_PATH = 'assets/data/portfolio.json';

    const query = (selector, root = document) => root.querySelector(selector);
    const queryAll = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    async function loadPortfolioData() {
        try {
            const response = await fetch(DATA_PATH);
            if (!response.ok) {
                throw new Error(`Unable to load portfolio data: ${response.status}`);
            }

            const data = await response.json();
            renderPortfolio(data);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
        }
    }

    function renderPortfolio(data) {
        if (!data) return;

        updatePersonalInfo(data.personal);
        updateHeroSection(data.personal);
        updateAboutSection(data.about);
        updateSkillsSection(data.skills);
        updateExperienceSection(data.experience);
        updateProjectsSection(data.projects);
        updateContactSection(data.personal);
        updateFooter(data.personal);
    }

    function updatePersonalInfo(personal = {}) {
        const logo = query('.logo');
        if (logo && personal.logo) logo.textContent = personal.logo;

        const pageTitle = query('title');
        if (pageTitle && personal.name && personal.title) {
            pageTitle.textContent = `${personal.name} - ${personal.title}`;
        }
    }

    function updateHeroSection(personal = {}) {
        const titleEl = query('.hero-title');
        if (titleEl && personal.name) titleEl.textContent = personal.name;

        const subtitle = query('.hero-subtitle');
        if (subtitle && personal.title) subtitle.textContent = personal.title;

        const description = query('.hero-description');
        if (description && personal.description) description.textContent = personal.description;

        applySocialLinks(personal);
    }

    function updateAboutSection(about = {}) {
        const aboutParagraphs = queryAll('.about-text p');
        (about.paragraphs || []).forEach((paragraph, index) => {
            if (aboutParagraphs[index]) {
                aboutParagraphs[index].textContent = paragraph;
            }
        });

        const statCards = queryAll('.about-stats .stat');
        (about.stats || []).forEach((stat, index) => {
            if (!statCards[index]) return;
            const heading = query('h3', statCards[index]);
            const label = query('p', statCards[index]);
            if (heading) heading.textContent = stat.number || '';
            if (label) label.textContent = stat.label || '';
        });
    }

    function updateSkillsSection(skills = []) {
        const skillsGrid = query('.skills-grid');
        if (!skillsGrid || !Array.isArray(skills)) return;

        skillsGrid.innerHTML = skills
            .map((skill) => {
                const items = (skill.items || []).map((item) => `<li>${item}</li>`).join('');
                return `
                    <div class="skill-card">
                        <div class="skill-icon">${skill.icon || '•'}</div>
                        <h3>${skill.title || 'Skill Area'}</h3>
                        <ul>${items}</ul>
                    </div>
                `;
            })
            .join('');
    }

    function updateExperienceSection(experiences = []) {
        const timeline = query('.experience-timeline');
        if (!timeline || !Array.isArray(experiences)) return;

        timeline.innerHTML = experiences
            .map((experience) => {
                const achievements = (experience.achievements || []).map((item) => `<li>${item}</li>`).join('');
                return `
                    <div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <h3>${experience.position || ''}</h3>
                            <p class="company">${experience.company || ''}</p>
                            <p class="date">${experience.date || ''}</p>
                            <ul class="achievements">${achievements}</ul>
                        </div>
                    </div>
                `;
            })
            .join('');
    }

    function updateProjectsSection(projects = []) {
        const projectsGrid = query('.projects-grid');
        if (!projectsGrid || !Array.isArray(projects)) return;

        projectsGrid.innerHTML = projects
            .map((project) => {
                const links = (project.links || [])
                    .map(
                        (link) =>
                            `<a href="${link.url}" ${link.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="project-link">${link.label}</a>`
                    )
                    .join('');

                return `
                    <div class="project-card">
                        <div class="project-image">
                            <div class="project-placeholder">${project.emoji || '•'}</div>
                        </div>
                        <div class="project-content">
                            <h3>${project.title || ''}</h3>
                            <p class="project-description">${project.description || ''}</p>
                            <p class="tech-stack">${project.tech || ''}</p>
                            <div class="project-links">${links}</div>
                        </div>
                    </div>
                `;
            })
            .join('');
    }

    function updateContactSection(personal = {}) {
        const emailLink = query('a[href^="mailto:"]');
        if (emailLink && personal.email) {
            emailLink.href = `mailto:${personal.email}`;
            emailLink.textContent = personal.email;
        }

        applySocialLinks(personal);
    }

    function applySocialLinks(personal = {}) {
        const socialMap = {
            linkedin: personal.linkedin,
            github: personal.github
        };

        queryAll('[data-social-link]').forEach((link) => {
            const key = link.getAttribute('data-social-link');
            const url = socialMap[key];
            if (url) link.href = url;
        });
    }

    function updateFooter(personal = {}) {
        const footerName = query('#footer-name');
        const footerTitle = query('#footer-title');
        const footerLocation = query('#footer-location');

        if (footerName && personal.name) footerName.textContent = personal.name;
        if (footerTitle && personal.title) footerTitle.textContent = personal.title;
        if (footerLocation && personal.location) footerLocation.textContent = personal.location;
    }

    document.addEventListener('DOMContentLoaded', loadPortfolioData);
})();
