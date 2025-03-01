import { useAuthStore } from '../../../entities/model/useAuthStore';
import { useUserStore } from '../../../entities/model/useUserStore';
import { useProductStore } from '../../../entities/model/useProductStore';
import { ProductForm } from '../../../widgets/productForm';
import { ProductList } from '../../../widgets/productList';
import styles from './AdminPage.module.scss';
import { useEffect, useState } from 'react';

export const AdminPage = () => {
  const { isLoading: authLoading, user } = useAuthStore();
  const { users, isLoading: usersLoading, error: userError, fetchUsers } = useUserStore();
  const { 
    products, 
    isLoading: productsLoading, 
    error: productError, 
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  } = useProductStore();
  
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products'); // 'users' или 'products'
  
  // Загружаем товары при первом рендере
  useEffect(() => {
    if (activeTab === 'products' && !products.length && !productsLoading) {
      handleGetProducts();
    }
  }, [activeTab]);

  const handleGetUsers = async () => {
    try {
      await fetchUsers();
      setShowUsers(true);
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
    }
  };
  
  const handleGetProducts = async () => {
    try {
      await fetchProducts();
      setShowProducts(true);
    } catch (error) {
      console.error('Ошибка при получении товаров:', error);
    }
  };
  
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };
  
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
    }
  };
  
  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Ошибка при сохранении товара:', error);
    }
  };
  
  const handleCancelForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  if (authLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }
  
  if (!user || !user.role?.includes('ADMIN')) {
    console.log(user.role?.includes('ADMIN'));
    return <div className={styles.accessDenied}>Доступ запрещен. Только для администраторов.</div>;
  }

  return (
    <div className={styles.adminPage}>
      <h1 className={styles.title}>Админ-панель</h1>
      <p className={styles.welcome}>{user?.email} Добро пожаловать в панель администратора.</p>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'products' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Управление товарами
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Управление пользователями
        </button>
      </div>

      {activeTab === 'users' && (
        <div className={styles.section}>
          <div className={styles.actions}>
            <button 
              className={styles.button} 
              onClick={handleGetUsers}
              disabled={usersLoading}
            >
              {usersLoading ? 'Загрузка...' : 'Получить пользователей'}
            </button>
          </div>

          {userError && <div className={styles.error}>{userError}</div>}

          {showUsers && (
            <div className={styles.usersContainer}>
              <h2 className={styles.subtitle}>Список пользователей</h2>
              {users.length > 0 ? (
                <ul className={styles.usersList}>
                  {users.map((user) => (
                    <li key={user.id} className={styles.userItem}>
                      <div className={styles.userInfo}>
                        <span className={styles.userEmail}>{user.email}</span>
                        <span className={styles.userRole}>{user.roles?.map(role => role.value).join(', ')}</span>
                        <span className={`${styles.userStatus} ${!user.isActivated ? styles.notActivated : ''}`}>
                          {user.isActivated ? 'Активирован' : 'Не активирован'}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyList}>Пользователи не найдены</p>
              )}
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'products' && (
        <div className={styles.section}>
          <div className={styles.actionBar}>
            <button 
              className={styles.button} 
              onClick={handleGetProducts}
              disabled={productsLoading}
            >
              {productsLoading ? 'Загрузка...' : 'Обновить список товаров'}
            </button>
            
            <button 
              className={`${styles.button} ${styles.createButton}`} 
              onClick={handleCreateProduct}
            >
              Добавить новый товар
            </button>
          </div>

          {productError && <div className={styles.error}>{productError}</div>}
          
          {showProductForm && (
            <div className={styles.formContainer}>
              <ProductForm 
                product={editingProduct} 
                onSubmit={handleProductSubmit} 
                onCancel={handleCancelForm} 
              />
            </div>
          )}

          {showProducts && !showProductForm && (
            <div className={styles.productsContainer}>
              <h2 className={styles.subtitle}>Список товаров</h2>
              <ProductList 
                products={products} 
                onEdit={handleEditProduct} 
                onDelete={handleDeleteProduct} 
                isLoading={productsLoading} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
