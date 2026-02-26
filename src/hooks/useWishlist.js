import { useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../api/api';
import { useAuth } from '../contexts/AuthContext';

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlistIds(new Set());
      return;
    }
    const fetchIds = async () => {
      try {
        const ids = await wishlistAPI.getWishlistIds();
        setWishlistIds(new Set(ids));
      } catch {}
    };
    fetchIds();
  }, [isAuthenticated]);

  const toggle = useCallback(
    async (productId) => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const result = await wishlistAPI.toggleWishlist(productId);
        setWishlistIds((prev) => {
          const next = new Set(prev);
          if (result.action === 'added' || !prev.has(productId)) {
            next.add(productId);
          } else {
            next.delete(productId);
          }
          return next;
        });
      } catch (err) {
        console.error('Wishlist toggle error:', err);
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated]
  );

  const isInWishlist = useCallback(
    (productId) => wishlistIds.has(productId),
    [wishlistIds]
  );

  return { wishlistIds, loading, toggle, isInWishlist };
}