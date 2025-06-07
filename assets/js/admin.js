
// Dashboard data and state management
class Dashboard {
    constructor() {
        this.data = {
            userGrowth: { value: 1250, change: 4.8 },
            totalSales: { value: 16920, change: 12.5 },
            engagement: { value: 42.5, change: 2.0 }
        };
        this.chartData = this.generateChartData();
        this.activities = [
            { icon: '🏆', title: 'Achievement unlocked', time: '1 hour ago' },
            { icon: '💳', title: 'New card activated', time: '2 hours ago' },
            { icon: '💰', title: 'Transaction completed', time: '3 hours ago' }
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startRealTimeUpdates();
        this.animateCharts();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Chart dropdown change
        const chartDropdown = document.querySelector('.chart-dropdown');
        chartDropdown?.addEventListener('change', (e) => {
            this.updateChartView(e.target.value);
        });

        // Navigation clicks
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNavItem(link);
            });
        });

        // Stats card hover effects
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateStatCard(card);
            });
        });

        // Alert card interactions
        document.querySelectorAll('.alert-card').forEach(card => {
            card.addEventListener('click', () => {
                this.handleSecurityAlert(card);
            });
        });
    }

    generateChartData() {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'MAY', 'JUN'];
        const users = [];
        const sales = [];
        
        for (let i = 0; i < months.length; i++) {
            users.push(Math.random() * 100 + 20);
            sales.push(Math.random() * 80 + 30);
        }
        
        return { months, users, sales };
    }

    updateChartView(view) {
        const chartPath = document.querySelector('.chart-path');
        const chartPathSecondary = document.querySelector('.chart-path-secondary');
        
        if (!chartPath) return;

        let primaryData, secondaryData;
        
        switch(view.toLowerCase()) {
            case 'users':
                primaryData = this.chartData.users;
                secondaryData = null;
                break;
            case 'sales':
                primaryData = this.chartData.sales;
                secondaryData = null;
                break;
            default:
                primaryData = this.chartData.users;
                secondaryData = this.chartData.sales;
        }

        this.animateChartPath(chartPath, primaryData);
        if (secondaryData && chartPathSecondary) {
            this.animateChartPath(chartPathSecondary, secondaryData);
            chartPathSecondary.style.opacity = '1';
        } else if (chartPathSecondary) {
            chartPathSecondary.style.opacity = '0';
        }
    }

    animateChartPath(pathElement, data) {
        if (!pathElement || !data) return;

        const width = 400;
        const height = 120;
        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - (value / 100) * height;
            return `${x},${y}`;
        });

        const pathData = `M ${points[0]} ${points.slice(1).map(point => `L ${point}`).join(' ')}`;
        
        // Animate path drawing
        pathElement.style.strokeDasharray = pathElement.getTotalLength();
        pathElement.style.strokeDashoffset = pathElement.getTotalLength();
        pathElement.setAttribute('d', pathData);
        
        setTimeout(() => {
            pathElement.style.transition = 'stroke-dashoffset 2s ease-in-out';
            pathElement.style.strokeDashoffset = '0';
        }, 100);
    }

    animateCharts() {
        setTimeout(() => {
            this.updateChartView('both');
        }, 500);
    }

    setActiveNavItem(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
        
        // Update page title
        const pageTitle = document.querySelector('.page-title');
        const linkText = activeLink.textContent.trim().toUpperCase();
        pageTitle.textContent = linkText;
    }

    animateStatCard(card) {
        const value = card.querySelector('.stat-value');
        const currentValue = parseInt(value.textContent.replace(/[,$]/g, ''));
        
        // Add subtle pulse animation
        card.style.transform = 'translateY(-2px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = 'translateY(-2px) scale(1)';
        }, 200);
    }

    startRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateStats();
            this.updateActivities();
        }, 30000); // Update every 30 seconds

        // Update time stamps
        setInterval(() => {
            this.updateTimeStamps();
        }, 60000); // Update every minute
    }

    updateStats() {
        // Simulate small changes in stats
        Object.keys(this.data).forEach(key => {
            const change = (Math.random() - 0.5) * 2; // -1 to 1% change
            const stat = this.data[key];
            
            if (key === 'totalSales') {
                stat.value += Math.floor(Math.random() * 100 - 50);
                stat.value = Math.max(0, stat.value);
            } else if (key === 'userGrowth') {
                stat.value += Math.floor(Math.random() * 10 - 5);
                stat.value = Math.max(0, stat.value);
            } else {
                stat.value += parseFloat((Math.random() * 2 - 1).toFixed(1));
                stat.value = Math.max(0, Math.min(100, stat.value));
            }
            
            stat.change = parseFloat((stat.change + change).toFixed(1));
        });

        this.renderStats();
    }

    renderStats() {
        const statCards = document.querySelectorAll('.stat-card');
        const keys = Object.keys(this.data);
        
        statCards.forEach((card, index) => {
            if (keys[index]) {
                const stat = this.data[keys[index]];
                const valueElement = card.querySelector('.stat-value');
                const changeElement = card.querySelector('.stat-change');
                
                if (keys[index] === 'totalSales') {
                    valueElement.textContent = `${stat.value.toLocaleString()}`;
                } else if (keys[index] === 'engagement') {
                    valueElement.textContent = `${stat.value}%`;
                } else {
                    valueElement.textContent = stat.value.toLocaleString();
                }
                
                changeElement.textContent = `${stat.change >= 0 ? '+' : ''}${stat.change}%`;
                changeElement.style.color = stat.change >= 0 ? '#22c55e' : '#ef4444';
            }
        });
    }

    updateActivities() {
        const newActivities = [
            { icon: '📧', title: 'New message received', time: 'Just now' },
            { icon: '🔔', title: 'System notification', time: '5 minutes ago' },
            { icon: '👤', title: 'User registered', time: '10 minutes ago' },
            { icon: '🛡️', title: 'Security scan completed', time: '15 minutes ago' }
        ];
        
        // Randomly add new activity
        if (Math.random() > 0.7) {
            const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
            this.activities.unshift(randomActivity);
            this.activities = this.activities.slice(0, 3); // Keep only 3 activities
            this.renderActivities();
        }
    }

    renderActivities() {
        const activityList = document.querySelector('.activity-list');
        if (!activityList) return;

        activityList.innerHTML = this.activities.map(activity => `
            <li class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </li>
        `).join('');
    }

    updateTimeStamps() {
        // Update relative time stamps
        const timeElements = document.querySelectorAll('.activity-time');
        timeElements.forEach(element => {
            const currentTime = element.textContent;
            if (currentTime.includes('hour')) {
                const hours = parseInt(currentTime);
                element.textContent = `${hours + 1} hours ago`;
            } else if (currentTime.includes('minutes')) {
                const minutes = parseInt(currentTime);
                if (minutes < 55) {
                    element.textContent = `${minutes + 5} minutes ago`;
                } else {
                    element.textContent = '1 hour ago';
                }
            }
        });
    }

    handleSecurityAlert(alertCard) {
        // Add clicked animation
        alertCard.style.transform = 'scale(0.98)';
        alertCard.style.opacity = '0.8';
        
        setTimeout(() => {
            alertCard.style.transform = 'scale(1)';
            alertCard.style.opacity = '1';
        }, 150);

        // Show alert details (in a real app, this would open a modal)
        console.log('Security alert clicked - would show detailed information');
        
        // Add pulse effect to alert icon
        const alertIcon = alertCard.querySelector('.alert-icon');
        alertIcon.style.animation = 'pulse 1s ease-in-out 3';
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
            });
        }
    }
}

// Utility functions for animations and effects
function addPulseAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        .sidebar.mobile-open {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            height: 100vh;
        }
        
        @media (max-width: 768px) {
            .sidebar.mobile-open {
                display: block;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addPulseAnimation();
    const dashboard = new Dashboard();
    
    // Add some entrance animations
    setTimeout(() => {
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.querySelector('[href="#"]:nth-child(1) .nav-link')?.click();
                break;
            case '2':
                e.preventDefault();
                document.querySelector('[href="#"]:nth-child(2) .nav-link')?.click();
                break;
            case 'r':
                e.preventDefault();
                location.reload();
                break;
        }
    }
});
