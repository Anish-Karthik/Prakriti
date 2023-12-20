"use client"
import React from "react"
import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"

import { useMessageStore } from "@/hooks/useMessage"

// Styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  message: {
    marginBottom: 10,
  },
})

const PDFReport: React.FC = () => {
  const messages = useMessageStore((state) => state.messages)

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Message Report</Text>
          {messages.map((message, index) => (
            <Text key={index} style={styles.message}>
              {message.content}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  )

  return (
    <div>
      <PDFDownloadLink document={<MyDocument />} fileName="message_report.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading..." : "Download PDF"
        }
      </PDFDownloadLink>
      <PDFViewer style={{ width: "100%", height: "500px" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  )
}

export default PDFReport
