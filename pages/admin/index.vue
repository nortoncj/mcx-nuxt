<template>
	<div class="dashboard">
		<div class="stats-grid">
			<div class="stat-card">
				<div class="stat-label">
					User Growth
				</div>
				<div class="stat-value">
					{{ data.userGrowth.value.toLocaleString() }}
				</div>
				<div
					class="stat-change"
					:class="{ positive: data.userGrowth.change > 0, negative: data.userGrowth.change < 0 }"
				>
					{{ data.userGrowth.change > 0 ? '+' : '' }}{{ data.userGrowth.change }}%
				</div>
			</div>
			<div class="stat-card">
				<div class="stat-label">
					Total Sales
				</div>
				<div class="stat-value">
					${{ data.totalSales.value.toLocaleString() }}
				</div>
				<div
					class="stat-change"
					:class="{ positive: data.totalSales.change > 0, negative: data.totalSales.change < 0 }"
				>
					{{ data.totalSales.change > 0 ? '+' : '' }}{{ data.totalSales.change }}%
				</div>
			</div>
			<div class="stat-card">
				<div class="stat-label">
					Engagement
				</div>
				<div class="stat-value">
					{{ data.engagement.value.toFixed(1) }}%
				</div>
				<div
					class="stat-change"
					:class="{ positive: data.engagement.change > 0, negative: data.engagement.change < 0 }"
				>
					{{ data.engagement.change > 0 ? '+' : '' }}{{ data.engagement.change }}%
				</div>
			</div>
		</div>

		<div class="charts-section">
			<div class="chart-card">
				<h2 class="section-title">
					CHARTS
				</h2>
				<div class="chart-header">
					<h3 class="chart-title">
						User & Sales Growth
					</h3>
					<select
						v-model="chartSettings.selectedView"
						class="chart-dropdown"
						@change="handleChartChange"
					>
						<option value="both">
							Both
						</option>
						<option value="users">
							Users
						</option>
						<option value="sales">
							Sales
						</option>
					</select>
				</div>
				<div class="chart-area">
					<svg
						class="chart-line"
						viewBox="0 -20 400 120"
					>
						<!-- Define gradients for area fills -->
						<defs>
							<linearGradient
								id="userGradient"
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop
									offset="0%"
									style="stop-color:#c4a100;stop-opacity:0.3"
								/>
								<stop
									offset="100%"
									style="stop-color:#c4a100;stop-opacity:0.05"
								/>
							</linearGradient>
							<linearGradient
								id="salesGradient"
								x1="0%"
								y1="0%"
								x2="0%"
								y2="100%"
							>
								<stop
									offset="0%"
									style="stop-color:#8B0000;stop-opacity:0.3"
								/>
								<stop
									offset="100%"
									style="stop-color:#8B0000;stop-opacity:0.05"
								/>
							</linearGradient>
						</defs>

						<!-- User area fill -->
						<path
							v-if="chartData.userAreaPath && chartSettings.showUsers"
							:d="chartData.userAreaPath"
							fill="url(#userGradient)"
							class="chart-area-fill user-area"
						/>

						<!-- Sales area fill -->
						<path
							v-if="chartData.salesAreaPath && chartSettings.showSales"
							:d="chartData.salesAreaPath"
							fill="url(#salesGradient)"
							class="chart-area-fill sales-area"
						/>

						<!-- User growth line -->
						<path
							v-if="chartData.userGrowthPath && chartSettings.showUsers"
							class="chart-path user-line"
							:d="chartData.userGrowthPath"
							fill="none"
							stroke="#c4a100"
							stroke-width="3"
							stroke-linecap="round"
						/>

						<!-- Sales growth line -->
						<path
							v-if="chartData.salesGrowthPath && chartSettings.showSales"
							class="chart-path-secondary sales-line"
							:d="chartData.salesGrowthPath"
							fill="none"
							stroke="#8B0000"
							stroke-width="3"
							stroke-linecap="round"
						/>

						<!-- Data points for users -->
						<g v-if="chartData.users.length > 0 && chartSettings.showUsers">
							<circle
								v-for="(value, index) in chartData.users"
								:key="`user-${index}`"
								:cx="(index / (chartData.users.length - 1)) * 400"
								:cy="80 - ((value - Math.min(...chartData.users)) / (Math.max(...chartData.users) - Math.min(...chartData.users))) * 60"
								r="5"
								fill="#c4a100"
								stroke="white"
								stroke-width="2"
								class="chart-point user-point"
							>
								<title>{{ chartData.months[index] }}: {{ value.toLocaleString() }} users</title>
							</circle>
						</g>

						<!-- Data points for sales -->
						<g v-if="chartData.sales.length > 0 && chartSettings.showSales">
							<circle
								v-for="(value, index) in chartData.sales"
								:key="`sales-${index}`"
								:cx="(index / (chartData.sales.length - 1)) * 400"
								:cy="80 - ((value - Math.min(...chartData.sales)) / (Math.max(...chartData.sales) - Math.min(...chartData.sales))) * 60 + 10"
								r="4"
								fill="#8B0000"
								stroke="white"
								stroke-width="2"
								class="chart-point sales-point"
							>
								<title>{{ chartData.months[index] }}: ${{ value }}k sales</title>
							</circle>
						</g>
					</svg>

					<div class="chart-labels">
						<span
							v-for="month in chartData.months"
							:key="month"
						>{{ month }}</span>
					</div>

					<!-- Chart Legend -->
					<div class="chart-legend">
						<div
							v-if="chartSettings.showUsers"
							class="legend-item"
						>
							<div
								class="legend-color"
								style="background: #c4a100;"
							/>
							<span>Users ({{ chartData.users[chartData.users.length - 1]?.toLocaleString() || 0 }})</span>
						</div>
						<div
							v-if="chartSettings.showSales"
							class="legend-item"
						>
							<div
								class="legend-color"
								style="background: #8B0000;"
							/>
							<span>Sales (${{ chartData.sales[chartData.sales.length - 1] || 0 }}k)</span>
						</div>
					</div>
				</div>
			</div>

			<div class="chart-card">
				<h2 class="section-title">
					RECENT ACTIVITY
				</h2>
				<ul class="activity-list">
					<li
						v-for="(activity, index) in activities"
						:key="`${activity.title}-${index}`"
						class="activity-item"
					>
						<div
							class="activity-icon"
							:class="`activity-${activity.type}`"
						>
							{{ activity.icon }}
						</div>
						<div class="activity-content">
							<div class="activity-title">
								{{ activity.title }}
							</div>
							<div class="activity-time">
								{{ activity.time }}
							</div>
						</div>
						<div
							class="activity-indicator"
							:class="`indicator-${activity.type}`"
						/>
					</li>
				</ul>

				<!-- Activity Stats -->
				<div class="activity-stats">
					<div class="activity-count">
						<span class="count-number">{{ activities.length }}</span>
						<span class="count-label">Recent</span>
					</div>
					<button
						class="refresh-btn"
						@click="updateActivities"
					>
						<span class="refresh-icon">🔄</span>
					</button>
				</div>
			</div>
		</div>

		<h2 class="section-title">
			SECURITY ALERT
		</h2>
		<div class="security-alerts">
			<div class="alert-card">
				<div class="alert-icon">
					⚠
				</div>
				<div class="alert-title">
					Unusual Activity Detected
				</div>
				<div class="alert-message">
					Immediate action required to protect your data.
				</div>
			</div>
			<div class="alert-card">
				<div class="alert-icon">
					⚠
				</div>
				<div class="alert-title">
					Unusual Activity
				</div>
				<div class="alert-message">
					Immediate action required to protect your data.
				</div>
			</div>
		</div>

		<!-- Debug Panel (remove in production) -->
		<div
			class="debug-panel"
			style="position: fixed; bottom: 20px; right: 20px; background: rgba(0,0,0,0.8); color: white; padding: 1rem; border-radius: 8px; font-size: 12px;"
		>
			<div><strong>Debug Info:</strong></div>
			<div>User Growth: {{ data.userGrowth.value }} ({{ data.userGrowth.change }}%)</div>
			<div>Total Sales: ${{ data.totalSales.value }} ({{ data.totalSales.change }}%)</div>
			<div>Engagement: {{ data.engagement.value.toFixed(1) }}% ({{ data.engagement.change }}%)</div>
			<div>Activities: {{ activities.length }}</div>
			<div>Chart Selection: {{ chartSettings.selectedView }}</div>
			<div>Mobile Menu: {{ isMobileMenuOpen ? 'Open' : 'Closed' }}</div>
			<div>Show Users: {{ chartSettings.showUsers }}</div>
			<div>Show Sales: {{ chartSettings.showSales }}</div>
			<div>Chart Users: {{ chartData.users.join(', ') }}</div>
			<div>Chart Sales: {{ chartData.sales.join(', ') }}</div>
			<div style="margin-top: 0.5rem;">
				<button
					style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: #c4a100; border: none; border-radius: 4px; color: black; cursor: pointer;"
					@click="updateStats"
				>
					Update Stats
				</button>
				<button
					style="margin-right: 0.5rem; padding: 0.25rem 0.5rem; background: #8B0000; border: none; border-radius: 4px; color: white; cursor: pointer;"
					@click="generateChartData"
				>
					New Charts
				</button>
				<button
					style="padding: 0.25rem 0.5rem; background: #22c55e; border: none; border-radius: 4px; color: white; cursor: pointer;"
					@click="updateActivities"
				>
					Add Activity
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: "admin",
});

// Use the dashboard composable
const {
	data,
	activities,
	chartData,
	chartSettings,
	updateStats,
	updateActivities,
	generateChartData,
	changeChartView,
} = useDashboard();

// Optional: Manual refresh button functionality
const handleRefresh = () => {
	updateStats();
	updateActivities();
	generateChartData();
};

const handleChartChange = () => {
	console.log("Chart selection changed to:", chartSettings.value.selectedView);
	console.log("Show users:", chartSettings.value.showUsers);
	console.log("Show sales:", chartSettings.value.showSales);
	changeChartView(chartSettings.value.selectedView);
};

// Log the data to console for debugging
onMounted(() => {
	console.log("Dashboard mounted with data:", {
		data: data.value,
		activities: activities.value,
		chartData: chartData.value,
	});

	// Add escape key listener
	const handleEscape = (e) => {
		if (e.key === "Escape" && isMobileMenuOpen.value) {
			closeMobileMenu();
		}
	};

	document.addEventListener("keydown", handleEscape);

	// Cleanup on unmount
	onBeforeUnmount(() => {
		document.removeEventListener("keydown", handleEscape);
	});
});
</script>

  <style scoped>
  @import "~/assets/css/admin/admin.css";

  /* Additional styles for dynamic content */
  .stat-change.positive {
    color: #22c55e;
  }

  .stat-change.negative {
    color: #ef4444;
  }

  /* Chart enhancements */
  .chart-legend {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(196, 161, 0, 0.1);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #666;
  }

  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  /* Activity enhancements */
  .activity-item {
    position: relative;
    transition: all 0.3s ease;
  }

  .activity-item:hover {
    background: rgba(196, 161, 0, 0.05);
    transform: translateX(5px);
  }

  .activity-indicator {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    opacity: 0.6;
  }

  .indicator-achievement { background: #c4a100; }
  .indicator-card { background: #8B0000; }
  .indicator-transaction { background: #22c55e; }
  .indicator-security { background: #ef4444; }
  .indicator-message { background: #3b82f6; }
  .indicator-notification { background: #f59e0b; }
  .indicator-user { background: #8b5cf6; }
  .indicator-opportunity { background: #ec4899; }
  .indicator-business { background: #06b6d4; }
  .indicator-report { background: #84cc16; }

  .activity-achievement { background: linear-gradient(45deg, #c4a100, #d4b520); }
  .activity-card { background: linear-gradient(45deg, #8B0000, #a00000); }
  .activity-transaction { background: linear-gradient(45deg, #22c55e, #16a34a); }
  .activity-security { background: linear-gradient(45deg, #ef4444, #dc2626); }
  .activity-message { background: linear-gradient(45deg, #3b82f6, #2563eb); }
  .activity-notification { background: linear-gradient(45deg, #f59e0b, #d97706); }
  .activity-user { background: linear-gradient(45deg, #8b5cf6, #7c3aed); }
  .activity-opportunity { background: linear-gradient(45deg, #ec4899, #db2777); }
  .activity-business { background: linear-gradient(45deg, #06b6d4, #0891b2); }
  .activity-report { background: linear-gradient(45deg, #84cc16, #65a30d); }

  .activity-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(196, 161, 0, 0.1);
  }

  .activity-count {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .count-number {
    font-size: 1.5rem;
    font-weight: bold;
    color: #c4a100;
  }

  .count-label {
    font-size: 0.8rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .refresh-btn {
    background: none;
    border: 2px solid #c4a100;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .refresh-btn:hover {
    background: #c4a100;
    transform: rotate(180deg);
  }

  .refresh-icon {
    font-size: 1.2rem;
  }

  .debug-panel {
    z-index: 9999;
    max-width: 320px;
    font-family: monospace;
  }

  /* Chart area and line enhancements */
  .chart-area-fill {
    transition: all 0.3s ease;
    opacity: 0.8;
  }

  .chart-area-fill:hover {
    opacity: 1;
  }

  .chart-path,
  .chart-path-secondary {
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
  }

  .user-line:hover {
    stroke-width: 4;
    filter: drop-shadow(0 0 8px rgba(196, 161, 0, 0.6));
  }

  .sales-line:hover {
    stroke-width: 4;
    filter: drop-shadow(0 0 8px rgba(139, 0, 0, 0.6));
  }

  .chart-point {
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .user-point:hover {
    r: 7;
    filter: drop-shadow(0 0 6px rgba(196, 161, 0, 0.8));
  }

  .sales-point:hover {
    r: 6;
    filter: drop-shadow(0 0 6px rgba(139, 0, 0, 0.8));
  }

  /* Chart dropdown styling */
  .chart-dropdown {
    background: rgba(196, 161, 0, 0.1);
    border: 2px solid #c4a100;
    border-radius: 6px;
    padding: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .chart-dropdown:hover {
    background: rgba(196, 161, 0, 0.2);
    transform: translateY(-1px);
  }

  .chart-dropdown:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(196, 161, 0, 0.3);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-avatar {
    width: 50px;
    height: 50px;
    background: linear-gradient(45deg, #c4a100, #d4b520);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .user-details {
    flex: 1;
  }

  .user-name {
    color: #ffffff;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .user-role {
    color: #c4a100;
    font-size: 0.9rem;
  }

  /* Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }

  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }

  /* Mobile responsive */
  @media (min-width: 769px) {
    .menu-toggle {
      display: none;
    }

    .mobile-menu,
    .mobile-menu-overlay {
      display: none !important;
    }
  }

  @media (max-width: 768px) {
    .mobile-menu {
      width: 100vw;
    }

    .header {
      padding: 1rem;
    }

    .page-title {
      font-size: 1.5rem;
    }
  }
  </style>
