import React from 'react'
import { View, Page, Text, Image, Document, StyleSheet} from "@react-pdf/renderer";
import CentralLogo from "../imgs/central-m-logo.png"


const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  logo: {
    width: '30%',
    marginBottom: 40,
  },
  address: {
    marginBottom: 10,
    fontSize: 14,
  },
  infoContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  infoRow: {
    marginBottom: 10,
    fontSize: 18,
  },
  commentContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  commentTitle: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 20,
  },
  price: {
    marginTop: 50,
    fontSize: 22,
  },
  section: {
    borderBottom: '10px solid #28a745',
    paddingBottom: 20,
    marginBottom: 20,
  },
  bar: {
    borderTop: '10px solid #28a745',
    paddingTop: 20,
    marginTop: 20,
  }
});

const PDFFile = ({ userData }) => {
  const commentParts = userData.comment.split(",");
  
  return (
    <Document>
      <Page style={styles.page}>
        <Image src={CentralLogo} style={styles.logo} />
        <Text style={styles.address}>Ul. Velikog sudije Gradjese 25, Zenica, Bosna i Hercegovina</Text>
        <Text style={styles.address}>E-mail: info@centralm.ba</Text>
        <Text style={styles.address}>Tel: 032 407 078</Text>
        <View style={[styles.infoContainer, styles.bar]}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoRow}>Vozilo: {userData.vehicle}</Text>
            <Text style={styles.infoRow}>Model: {userData.model}</Text>
            <Text style={styles.infoRow}>kW: {userData.kW}</Text>
            <Text style={styles.infoRow}>Godište: {userData.year}</Text>
            <Text style={styles.infoRow}>Tel: {userData.phone}</Text>
          </View>
        </View>
        <View style={[styles.commentContainer, styles.bar]}>
          <Text style={styles.commentTitle}>Popravke:</Text>
          {commentParts.map((part, index) => (
            <Text key={index} style={styles.commentText}>{part.trim()}</Text>
          ))}
        </View>
        <Text style={styles.price}>Cijena: {userData.price}</Text>
      </Page>
    </Document>
  );
};


export default PDFFile;