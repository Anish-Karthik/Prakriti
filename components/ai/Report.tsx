import React from "react"
import { Message } from "ai/react"

interface ReportProps {
  messages: Message[]
}

const Report: React.FC<ReportProps> = ({ messages }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow">
      <h2 className="text-2xl mb-4">Report</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-3 mb-3">
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Report
