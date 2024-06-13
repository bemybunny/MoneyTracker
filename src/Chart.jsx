import React from 'react'
import { Chart as Chartjs, defaults } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Chart = ({ income,expense }) => {
    return (
        <div className="w-52" style={{ height: '300px' }}>
            <Pie
                data={{
                    labels: ["income","expense"],
                    datasets: [{
                        label: "Tasks",
                        data: [income,expense],
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1
                    }]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

export default Chart
