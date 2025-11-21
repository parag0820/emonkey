// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   ScrollView,
//   Switch,
// } from 'react-native';

// const FilterModal = ({ visible, onClose }) => {
//   const [isPrime, setIsPrime] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);

//   const priceRanges = [
//     'Up to ₹1,300',
//     '₹1,300 - ₹13,500',
//     '₹13,500 - ₹20,000',
//     '₹20,000 - ₹31,000',
//     'Over ₹31,000',
//   ];

//   return (
//     <Modal visible={visible} animationType="slide" transparent={true}>
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <Text style={styles.backArrow}>←</Text>
//             </TouchableOpacity>
//             <Text style={styles.headerText}>Filters</Text>
//           </View>

//           {/* Body */}
//           <ScrollView style={styles.scrollContainer}>
//             {/* Suggested Filters */}
//             <Text style={styles.sectionTitle}>Suggested Filters</Text>

//             <View style={styles.row}>
//               <Text style={styles.primeText}>Prime</Text>
//               <Switch
//                 value={isPrime}
//                 onValueChange={() => setIsPrime(!isPrime)}
//               />
//             </View>

//             <View style={styles.filterTags}>
//               {['Value Picks', 'All Discounts', "Today's Deals"].map(item => (
//                 <TouchableOpacity key={item} style={styles.tag}>
//                   <Text style={styles.tagText}>{item}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Price Range */}
//             <Text style={styles.sectionTitle}>Price and Deals</Text>
//             <View style={styles.filterTags}>
//               {priceRanges.map(price => (
//                 <TouchableOpacity
//                   key={price}
//                   style={[
//                     styles.tag,
//                     selectedPrice === price && styles.selectedTag,
//                   ]}
//                   onPress={() => setSelectedPrice(price)}
//                 >
//                   <Text
//                     style={[
//                       styles.tagText,
//                       selectedPrice === price && styles.selectedTagText,
//                     ]}
//                   >
//                     {price}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             <View style={styles.filterTags}>
//               <TouchableOpacity style={styles.tag}>
//                 <Text style={styles.tagText}>Get It by Tomorrow</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.tag}>
//                 <Text style={styles.tagText}>Get It in 2 Days</Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>

//           {/* Footer Button */}
//           <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
//             <Text style={styles.applyText}>Show 444 results</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default FilterModal;

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: '#00000080',
//     justifyContent: 'flex-end',
//   },
//   container: {
//     height: '90%',
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   backArrow: {
//     fontSize: 24,
//     marginRight: 8,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   scrollContainer: {
//     flex: 1,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 10,
//     marginBottom: 8,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginVertical: 6,
//   },
//   primeText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   filterTags: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 10,
//   },
//   tag: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//   },
//   tagText: {
//     color: '#333',
//   },
//   selectedTag: {
//     backgroundColor: '#FFD814',
//     borderColor: '#FFD814',
//   },
//   selectedTagText: {
//     fontWeight: '600',
//   },
//   applyBtn: {
//     backgroundColor: '#FFD814',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   applyText: {
//     fontWeight: 'bold',
//     color: '#000',
//     fontSize: 16,
//   },
// });
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   ScrollView,
//   Switch,
//   TextInput,
// } from 'react-native';

// const FilterModal = ({ visible, onClose, onApply }) => {
//   const [isPrime, setIsPrime] = useState(false);
//   const [selectedPrice, setSelectedPrice] = useState(null);
//   const [city, setCity] = useState('');
//   const [productName, setProductName] = useState('');

//   const priceRanges = [
//     { label: 'Up to ₹1,300', min: 0, max: 1300 },
//     { label: '₹1,300 - ₹13,500', min: 1300, max: 13500 },
//     { label: '₹13,500 - ₹20,000', min: 13500, max: 20000 },
//     { label: '₹20,000 - ₹31,000', min: 20000, max: 31000 },
//     { label: 'Over ₹31,000', min: 31000, max: Infinity },
//   ];

//   const handleApply = () => {
//     onApply({
//       city,
//       productName,
//       priceRange: selectedPrice,
//       isPrime,
//     });
//     onClose();
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent={true}>
//       <View style={styles.overlay}>
//         <View style={styles.container}>
//           {/* Header */}
//           <View style={styles.header}>
//             <TouchableOpacity onPress={onClose}>
//               <Text style={styles.backArrow}>←</Text>
//             </TouchableOpacity>
//             <Text style={styles.headerText}>Filters</Text>
//           </View>

//           <ScrollView style={styles.scrollContainer}>
//             {/* City Filter */}
//             <Text style={styles.sectionTitle}>City</Text>
//             <TextInput
//               placeholder="Enter city name"
//               placeholderTextColor={'gray'}
//               value={city}
//               onChangeText={setCity}
//               style={styles.input}
//             />

//             {/* Product Name Filter */}
//             <Text style={styles.sectionTitle}>Product Name</Text>
//             <TextInput
//               placeholder="Enter product name"
//               placeholderTextColor={'gray'}
//               value={productName}
//               onChangeText={setProductName}
//               style={styles.input}
//             />

//             {/* Price Range */}
//             <Text style={styles.sectionTitle}>Price Range</Text>
//             <View style={styles.filterTags}>
//               {priceRanges.map(p => (
//                 <TouchableOpacity
//                   key={p.label}
//                   style={[
//                     styles.tag,
//                     selectedPrice?.label === p.label && styles.selectedTag,
//                   ]}
//                   onPress={() => setSelectedPrice(p)}
//                 >
//                   <Text
//                     style={[
//                       styles.tagText,
//                       selectedPrice?.label === p.label &&
//                         styles.selectedTagText,
//                     ]}
//                   >
//                     {p.label}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>

//           {/* Apply Button */}
//           <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
//             <Text style={styles.applyText}>Apply Filters</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//   },
//   container: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     margin: 20,
//     padding: 15,
//     maxHeight: '80%',
//   },
//   header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   backArrow: { fontSize: 20 },
//   headerText: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
//   sectionTitle: { marginVertical: 8, fontWeight: 'bold', fontSize: 16 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 8,
//     marginBottom: 10,
//   },
//   filterTags: { flexDirection: 'row', flexWrap: 'wrap' },
//   tag: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     margin: 5,
//   },
//   selectedTag: { backgroundColor: '#007bff' },
//   selectedTagText: { color: '#fff' },
//   applyBtn: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   applyText: { color: '#fff', fontWeight: 'bold' },
// });

// export default FilterModal;

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';

const FilterModal = ({ visible, onClose, onApply }) => {
  const [selectedCategory, setSelectedCategory] = useState('Suggested Filters');
  const [isPrime, setIsPrime] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const categories = ['Place or Area', 'Price and Deals', 'Customer Reviews'];

  // Right panel filter options for each category
  const filterOptions = {
    'Place or Area': ['Goa', 'Indore', 'Surat', 'Ratlam', 'Delhi', 'Mumbai'],
    'Price and Deals': [
      'Under ₹5,000',
      '₹5,000 - ₹10,000',
      '₹10,000 - ₹25,000',
      '₹25,000+',
    ],

    'Customer Reviews': ['4★ & above', '3★ & above', '2★ & above'],
  };

  const toggleTag = tag => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleApply = () => {
    onApply({
      isPrime,
      selectedTags,
      selectedCategory,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>Filters</Text>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Left Category Menu */}
            <ScrollView style={styles.categoryMenu}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryItem,
                    selectedCategory === cat && styles.activeCategory,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selectedCategory === cat && styles.activeCategoryText,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Right Filter Options */}
            <ScrollView style={styles.optionsContainer}>
              {/* Prime Switch (only for Suggested Filters) */}
              {selectedCategory === 'Suggested Filters' && (
                <View style={styles.primeRow}>
                  {/* <Text style={styles.primeText}>Prime</Text> */}
                  {/* <Switch value={isPrime} onValueChange={setIsPrime} /> */}
                </View>
              )}

              {/* Tags */}
              <View style={styles.tagsContainer}>
                {filterOptions[selectedCategory]?.map(option => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.tag,
                      selectedTags.includes(option) && styles.selectedTag,
                    ]}
                    onPress={() => toggleTag(option)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        selectedTags.includes(option) && styles.selectedTagText,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Bottom Apply Button */}
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    height: '85%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backArrow: { fontSize: 20, color: '#000' },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  content: { flexDirection: 'row', flex: 1 },
  categoryMenu: { width: '35%', backgroundColor: '#f6f6f6' },
  categoryItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryText: { fontSize: 14, color: '#555' },
  activeCategory: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#2a9d8f',
  },
  activeCategoryText: { color: '#2a9d8f', fontWeight: 'bold' },
  optionsContainer: { flex: 1, padding: 15 },
  primeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  primeText: { fontSize: 16, fontWeight: '600', color: '#000' },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 5,
  },
  selectedTag: { backgroundColor: '#2a9d8f', borderColor: '#2a9d8f' },
  tagText: { color: '#333' },
  selectedTagText: { color: '#fff', fontWeight: '600' },
  applyBtn: {
    backgroundColor: '#f7ca00',
    padding: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  applyText: { fontWeight: 'bold', fontSize: 16, color: '#000' },
});
