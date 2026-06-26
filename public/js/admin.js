        const tabButtons = document.querySelectorAll('.tab-btn');
        const panels = document.querySelectorAll('.panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                panels.forEach(panel => panel.classList.remove('active'));

                button.classList.add('active');
                const target = document.getElementById(button.dataset.target);
                if(target) {
                    target.classList.add('active');
                }
                if (button.dataset.target === 'revenue-panel') {
                    updateRevenueDashboard();
                }
            });
        });

        function setSubPanel(showId, hideId, clickedButton) {
            document.getElementById(showId).style.display = showId === 'quick-book' ? "grid" : "block";
            document.getElementById(hideId).style.display = "none";

            if (clickedButton) {
                const buttonGroup = clickedButton.parentElement;
                buttonGroup.querySelectorAll('.sub-tab').forEach(button => {
                    button.classList.remove('active');
                });
                clickedButton.classList.add('active');
            }
        }

        function UpcomingEvent(clickedButton){
            setSubPanel('upcoming', 'past', clickedButton);
        }

        function PastEvent(clickedButton){
            setSubPanel('past', 'upcoming', clickedButton);
        }

        function PendingBooking(clickedButton){
            setSubPanel('pending-bookings', 'quick-book', clickedButton);
        }

        function QuickBook(clickedButton){
            setSubPanel('quick-book', 'pending-bookings', clickedButton);
        }

        function openUpcomingPopup(clickedButton) {
            const row = clickedButton.closest('tr');
            const cells = row.querySelectorAll('td');

            document.getElementById('popup-event-name').textContent = cells[0].textContent;
            document.getElementById('popup-event-type').textContent = cells[1].textContent;
            document.getElementById('popup-event-location').textContent = cells[2].textContent;
            document.getElementById('popup-event-date').textContent = cells[3].textContent;
            document.getElementById('popup-event-visibility').textContent = row.dataset.visibility || 'Not set';
            document.getElementById('popup-event-ticket').textContent = row.dataset.ticket || 'Not set';
            document.getElementById('popup-event-details').textContent = row.dataset.details || 'No details available';
            hideUpcomingActionPanels();

            document.getElementById('popup-overlay').classList.add('active');
            document.getElementById('upcoming-popup').classList.add('active');
        }

        function closeUpcomingPopup() {
            document.getElementById('popup-overlay').classList.remove('active');
            document.getElementById('upcoming-popup').classList.remove('active');
            hideUpcomingActionPanels();
        }

        function openPastPopup(clickedButton) {
            const row = clickedButton.closest('tr');
            const cells = row.querySelectorAll('td');
            const popup = document.getElementById('past-popup');

            popup.querySelector('#popup-event-name').textContent = cells[0].textContent;
            popup.querySelector('#popup-event-type').textContent = cells[1].textContent;
            popup.querySelector('#popup-event-location').textContent = cells[2].textContent;
            popup.querySelector('#popup-event-date').textContent = cells[3].textContent;
            popup.querySelector('#popup-event-visibility').textContent = row.dataset.visibility || 'Not set';
            popup.querySelector('#popup-event-ticket').textContent = row.dataset.ticket || 'Not set';
            popup.querySelector('#popup-event-details').textContent = row.dataset.details || 'No details available';
            popup.querySelector('#popup-event-collected-amount').textContent = row.dataset.collectedAmount || cells[4].textContent || 'Not set';
            popup.querySelector('#popup-evnet-vender-expense').textContent = row.dataset.venderExpense || 'Not set';
            popup.querySelector('#popup-event-venue-cost').textContent = row.dataset.venueCost || 'Not set';
            popup.querySelector('#popup-evnet-ticket-sale').textContent = row.dataset.ticketSale || 'Not set';

            document.getElementById('popup-overlay').classList.add('active');
            popup.classList.add('active');
        }

        function closePastPopup() {
            document.getElementById('popup-overlay').classList.remove('active');
            document.getElementById('past-popup').classList.remove('active');
        }

        function showUpcomingAction(actionType) {
            hideUpcomingActionPanels();
            const panelId = actionType === 'cancel' ? 'cancel-event-panel' : 'complete-event-panel';
            document.getElementById(panelId).classList.add('active');
        }

        function hideUpcomingActionPanels() {
            document.querySelectorAll('.upcoming-action-panel').forEach(panel => {
                panel.classList.remove('active');
            });
        }

        function openBookingPopup(clickedButton) {
            const row = clickedButton.closest('tr');
            const cells = row.querySelectorAll('td');

            document.getElementById('booking-name').value = cells[0].textContent;
            document.getElementById('booking-contact').value = cells[1].textContent;
            document.getElementById('booking-event-date').value = cells[2].textContent;
            document.getElementById('booking-email').value = row.dataset.email || '';
            document.getElementById('booking-event-name').value = row.dataset.eventName || '';
            document.getElementById('booking-event-type').value = row.dataset.eventType || '';
            document.getElementById('booking-event-location').value = row.dataset.eventLocation || '';
            document.getElementById('booking-ticket-price').value = row.dataset.ticketPrice || '';
            document.getElementById('booking-total-cost').value = row.dataset.totalCost || '';
            document.getElementById('booking-event-details').value = row.dataset.details || '';

            setCheckedRadio('booking-visibility', row.dataset.visibility);
            setCheckedRadio('booking-ticket', row.dataset.ticket);
            updateTicketPriceField('booking-ticket', 'booking-ticket-price-field', 'booking-ticket-price');

            document.getElementById('popup-overlay').classList.add('active');
            document.getElementById('booking-popup').classList.add('active');
        }

        function closeBookingPopup() {
            document.getElementById('popup-overlay').classList.remove('active');
            document.getElementById('booking-popup').classList.remove('active');
        }

        function closeAllPopups() {
            document.getElementById('popup-overlay').classList.remove('active');
            document.getElementById('upcoming-popup').classList.remove('active');
            document.getElementById('booking-popup').classList.remove('active');
            document.getElementById('past-popup').classList.remove('active');
        }

        function setCheckedRadio(name, value) {
            document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                radio.checked = radio.value === value;
            });
        }

        function updateTicketPriceField(radioName, fieldId, inputId) {
            const selectedTicket = document.querySelector(`input[name="${radioName}"]:checked`);
            const priceField = document.getElementById(fieldId);
            const priceInput = document.getElementById(inputId);
            const shouldShowPrice = selectedTicket && selectedTicket.value === 'Yes';

            priceField.classList.toggle('active', shouldShowPrice);
            priceInput.required = shouldShowPrice;

            if (!shouldShowPrice) {
                priceInput.value = '';
            }
        }

        function setupTicketPriceToggle(radioName, fieldId, inputId) {
            document.querySelectorAll(`input[name="${radioName}"]`).forEach(radio => {
                radio.addEventListener('change', () => {
                    updateTicketPriceField(radioName, fieldId, inputId);
                });
            });
        }

        setupTicketPriceToggle('ticket', 'quick-ticket-price-field', 'quick-ticket-price');
        setupTicketPriceToggle('booking-ticket', 'booking-ticket-price-field', 'booking-ticket-price');

        const monthlyRevenueData = {
            default: {
                totalEvents: 50,
                pendingEvents: 10,
                completedEvents: 36,
                cancelledEvents: 4,
                totalRevenue: 50,
                collectedAmount: 38,
                vendorExpense: 11,
                venueCost: 8,
                staffCost: 4,
                marketingCost: 2,
                loss: 3,
                ticketSales: 9
            },
            '2026-06': {
                totalEvents: 64,
                pendingEvents: 14,
                completedEvents: 45,
                cancelledEvents: 5,
                totalRevenue: 68,
                collectedAmount: 52,
                vendorExpense: 14,
                venueCost: 10,
                staffCost: 5,
                marketingCost: 3,
                loss: 4,
                ticketSales: 13
            },
            '2026-07': {
                totalEvents: 42,
                pendingEvents: 8,
                completedEvents: 31,
                cancelledEvents: 3,
                totalRevenue: 44,
                collectedAmount: 35,
                vendorExpense: 9,
                venueCost: 7,
                staffCost: 3,
                marketingCost: 2,
                loss: 2,
                ticketSales: 7
            }
        };

        let activeRevenueMetrics = null;

        function updateRevenueDashboard() {
            const monthInput = document.getElementById('revenue-month');
            const selectedMonth = monthInput.value;
            const metrics = monthlyRevenueData[selectedMonth] || monthlyRevenueData.default;
            const totalExpense = metrics.vendorExpense + metrics.venueCost + metrics.staffCost + metrics.marketingCost;
            const due = metrics.totalRevenue - metrics.collectedAmount;
            const profit = metrics.collectedAmount + metrics.ticketSales - totalExpense - metrics.loss;
            const averageEventValue = metrics.totalEvents ? metrics.totalRevenue / metrics.totalEvents : 0;

            activeRevenueMetrics = {
                revenue: metrics.totalRevenue,
                expense: totalExpense,
                profit,
                loss: metrics.loss,
                due
            };

            document.getElementById('total-events').textContent = metrics.totalEvents;
            document.getElementById('pending-events').textContent = metrics.pendingEvents;
            document.getElementById('completed-events').textContent = metrics.completedEvents;
            document.getElementById('cancelled-events').textContent = metrics.cancelledEvents;
            document.getElementById('total-revenue').textContent = formatLakh(metrics.totalRevenue);
            document.getElementById('collected-amount').textContent = formatLakh(metrics.collectedAmount);
            document.getElementById('vendor-expense').textContent = formatLakh(metrics.vendorExpense);
            document.getElementById('venue-cost').textContent = formatLakh(metrics.venueCost);
            document.getElementById('ticket-sales').textContent = formatLakh(metrics.ticketSales);
            document.getElementById('average-event-value').textContent = formatLakh(averageEventValue);
            document.getElementById('net-profit').textContent = formatLakh(profit);
            document.getElementById('total-due').textContent = formatLakh(due);
            document.getElementById('total-loss').textContent = formatLakh(metrics.loss);
            document.getElementById('profit-note').textContent = profit >= 0 ? 'After expenses' : 'Needs attention';
            document.getElementById('chart-month-label').textContent = selectedMonth ? `Finance overview for ${selectedMonth}` : 'Current month overview';

            drawRevenueChart(activeRevenueMetrics);
        }

        function formatLakh(value) {
            return `Rs. ${Number(value).toFixed(value % 1 === 0 ? 0 : 1)}L`;
        }

        function drawRevenueChart(metrics) {
            const canvas = document.getElementById('revenue-chart');
            const context = canvas.getContext('2d');
            const pixelRatio = window.devicePixelRatio || 1;
            const displayWidth = canvas.clientWidth || 760;
            const displayHeight = 320;

            canvas.width = displayWidth * pixelRatio;
            canvas.height = displayHeight * pixelRatio;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.clearRect(0, 0, displayWidth, displayHeight);

            const chartItems = [
                { label: 'Revenue', value: metrics.revenue, color: '#5c4d9d' },
                { label: 'Expense', value: metrics.expense, color: '#0f8b8d' },
                { label: 'Profit', value: Math.max(metrics.profit, 0), color: '#2f9e44' },
                { label: 'Loss', value: metrics.loss, color: '#d64545' },
                { label: 'Due', value: metrics.due, color: '#e3a008' }
            ];
            const maxValue = Math.max(...chartItems.map(item => item.value), 10);
            const padding = { top: 24, right: 20, bottom: 54, left: 48 };
            const chartWidth = displayWidth - padding.left - padding.right;
            const chartHeight = displayHeight - padding.top - padding.bottom;
            const barGap = 18;
            const barWidth = Math.max(28, (chartWidth - barGap * (chartItems.length - 1)) / chartItems.length);

            context.strokeStyle = '#e7e3f3';
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(padding.left, padding.top);
            context.lineTo(padding.left, padding.top + chartHeight);
            context.lineTo(padding.left + chartWidth, padding.top + chartHeight);
            context.stroke();

            context.fillStyle = '#6b6a86';
            context.font = '12px Arial';
            context.textAlign = 'right';
            for (let i = 0; i <= 4; i++) {
                const y = padding.top + chartHeight - (chartHeight * i) / 4;
                const value = (maxValue * i) / 4;
                context.fillText(`${Math.round(value)}L`, padding.left - 10, y + 4);
                context.strokeStyle = '#f0eef8';
                context.beginPath();
                context.moveTo(padding.left, y);
                context.lineTo(padding.left + chartWidth, y);
                context.stroke();
            }

            chartItems.forEach((item, index) => {
                const x = padding.left + index * (barWidth + barGap);
                const barHeight = (item.value / maxValue) * chartHeight;
                const y = padding.top + chartHeight - barHeight;

                context.fillStyle = item.color;
                context.fillRect(x, y, barWidth, barHeight);
                context.fillStyle = '#2f2d3d';
                context.textAlign = 'center';
                context.font = '700 12px Arial';
                context.fillText(`${Math.round(item.value)}L`, x + barWidth / 2, y - 8);
                context.font = '12px Arial';
                context.fillText(item.label, x + barWidth / 2, padding.top + chartHeight + 28);
            });
        }

        window.addEventListener('resize', () => {
            if (activeRevenueMetrics) {
                drawRevenueChart(activeRevenueMetrics);
            }
        });

        updateRevenueDashboard();

    