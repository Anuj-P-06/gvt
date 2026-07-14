import { db } from './firebase.js';

// Elements
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const adminAuth = document.getElementById('admin-auth');
const adminDashboard = document.getElementById('admin-dashboard');
const logoutBtn = document.getElementById('logout-btn');

const addProductBtn = document.getElementById('add-product-btn');
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const productForm = document.getElementById('product-form');
const adminProductsList = document.getElementById('admin-products-list');
const adminProductsLoading = document.getElementById('admin-products-loading');

// State
let unsubscribeProducts = null;

// Listen to Auth State
if (typeof firebase !== 'undefined') {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      adminAuth.classList.add('hidden');
      adminDashboard.classList.remove('hidden');
      loadProducts();
    } else {
      adminAuth.classList.remove('hidden');
      adminDashboard.classList.add('hidden');
      if (unsubscribeProducts) unsubscribeProducts();
    }
  });
}

// Login
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.add('hidden');
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    
    try {
      if (typeof firebase !== 'undefined') {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        throw new Error("Firebase is not initialized");
      }
    } catch (error) {
      loginError.textContent = error.message;
      loginError.classList.remove('hidden');
    }
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    if (typeof firebase !== 'undefined') {
      firebase.auth().signOut();
    }
  });
}

// Load Products
function loadProducts() {
  if (!db) {
    adminProductsLoading.textContent = "Firebase not initialized. Cannot load products.";
    return;
  }
  
  adminProductsLoading.classList.remove('hidden');
  
  unsubscribeProducts = db.collection('products').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
    adminProductsLoading.classList.add('hidden');
    adminProductsList.innerHTML = '';
    
    if (snapshot.empty) {
      adminProductsList.innerHTML = '<tr><td colspan="4" class="px-6 py-4 text-center text-grey-dark">No products found. Add one above.</td></tr>';
      return;
    }
    
    snapshot.forEach(doc => {
      const product = doc.data();
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
          <img src="${product.image}" alt="${product.name}" class="h-10 w-10 rounded-md object-cover">
        </td>
        <td class="px-6 py-4 font-medium text-ind-black">${product.name}</td>
        <td class="px-6 py-4 text-grey-dark">${product.category}</td>
        <td class="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
          <button class="text-ind-orange hover:text-ind-orange-hover mr-3 edit-btn" data-id="${doc.id}">Edit</button>
          <button class="text-red-600 hover:text-red-900 delete-btn" data-id="${doc.id}">Delete</button>
        </td>
      `;
      adminProductsList.appendChild(tr);
    });
    
    // Attach event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        if(confirm("Are you sure you want to delete this product?")) {
          const id = e.target.getAttribute('data-id');
          await db.collection('products').doc(id).delete();
        }
      });
    });
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        const doc = await db.collection('products').doc(id).get();
        if (doc.exists) {
          const data = doc.data();
          document.getElementById('product-id').value = id;
          document.getElementById('product-name').value = data.name;
          document.getElementById('product-category').value = data.category;
          document.getElementById('product-image').value = data.image;
          document.getElementById('product-desc').value = data.description;
          document.getElementById('product-specs').value = (data.specs || []).join('\n');
          document.getElementById('modal-title').textContent = "Edit Product";
          productModal.classList.remove('hidden');
          productModal.classList.add('flex');
        }
      });
    });
  });
}

// Modal Toggle
if (addProductBtn) {
  addProductBtn.addEventListener('click', () => {
    productForm.reset();
    document.getElementById('product-id').value = '';
    document.getElementById('modal-title').textContent = "Add Product";
    productModal.classList.remove('hidden');
    productModal.classList.add('flex');
  });
}

[closeModalBtn, cancelModalBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      productModal.classList.add('hidden');
      productModal.classList.remove('flex');
    });
  }
});

// Save Product
if (productForm) {
  productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!db) {
      alert("Firebase not initialized.");
      return;
    }
    
    const id = document.getElementById('product-id').value;
    const saveBtn = document.getElementById('save-product-btn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;
    
    const specsArray = document.getElementById('product-specs').value
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);
      
    const productData = {
      name: document.getElementById('product-name').value,
      category: document.getElementById('product-category').value,
      image: document.getElementById('product-image').value,
      description: document.getElementById('product-desc').value,
      specs: specsArray,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
      if (id) {
        // Update
        await db.collection('products').doc(id).update(productData);
      } else {
        // Create
        productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        productData.sortOrder = Date.now(); // Simple sort order
        await db.collection('products').add(productData);
      }
      
      productModal.classList.add('hidden');
      productModal.classList.remove('flex');
    } catch (error) {
      alert("Error saving product: " + error.message);
    } finally {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }
  });
}
