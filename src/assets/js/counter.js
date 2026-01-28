/**
 * Visitor Counter
 * Fetches visitor count from AWS Lambda API and displays it
 */

async function updateVisitorCount() {
    try {
        // Replace with your actual API endpoint from API Gateway
        const apiEndpoint = 'https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod';
        
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch visitor count');
        }

        const data = await response.json();
        const count = data.visitor_count || 0;

        // Update the counter display with nice formatting
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            counterElement.innerText = count.toLocaleString();
            counterElement.style.animation = 'fadeIn 0.5s ease-in';
        }
        
        console.log(`✓ Page views: ${count}`);
    } catch (error) {
        console.warn('Visitor counter not yet configured:', error.message);
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            counterElement.innerText = '∞';
        }
    }
}

// Call the function when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateVisitorCount);
} else {
    updateVisitorCount();
}

// Optional: Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
