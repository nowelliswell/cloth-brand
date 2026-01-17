import { useState } from "react";

export default function ProductReviews({ reviews, rating, reviewCount, onAddReview }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 5,
    comment: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.user && newReview.comment) {
      onAddReview({
        ...newReview,
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
      });
      setNewReview({ user: "", rating: 5, comment: "" });
      setShowReviewForm(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#FFD700" : "#ddd", fontSize: "20px" }}>
        ★
      </span>
    ));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Customer Reviews</h3>
        <div style={styles.ratingOverview}>
          <div style={styles.ratingNumber}>{rating.toFixed(1)}</div>
          <div>
            <div style={styles.stars}>{renderStars(Math.round(rating))}</div>
            <div style={styles.reviewCount}>Based on {reviewCount} reviews</div>
          </div>
        </div>
      </div>

      <button
        style={styles.addReviewButton}
        onClick={() => setShowReviewForm(!showReviewForm)}
      >
        {showReviewForm ? "Cancel" : "Write a Review"}
      </button>

      {showReviewForm && (
        <form onSubmit={handleSubmit} style={styles.reviewForm}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Your Name</label>
            <input
              type="text"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Rating</label>
            <div style={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  style={styles.starButton}
                >
                  <span style={{ color: star <= newReview.rating ? "#FFD700" : "#ddd", fontSize: "28px" }}>
                    ★
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Your Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              style={styles.textarea}
              rows="4"
              required
            />
          </div>

          <button type="submit" style={styles.submitButton}>
            Submit Review
          </button>
        </form>
      )}

      <div style={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} style={styles.reviewItem}>
            <div style={styles.reviewHeader}>
              <div>
                <div style={styles.reviewUser}>{review.user}</div>
                <div style={styles.reviewDate}>{review.date}</div>
              </div>
              <div style={styles.reviewStars}>{renderStars(review.rating)}</div>
            </div>
            <p style={styles.reviewComment}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "40px",
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
  },
  header: {
    marginBottom: "30px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  ratingOverview: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#000",
  },
  stars: {
    marginBottom: "5px",
  },
  reviewCount: {
    fontSize: "14px",
    color: "#666",
  },
  addReviewButton: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
    fontWeight: "600",
  },
  reviewForm: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    fontFamily: "inherit",
    resize: "vertical",
  },
  ratingInput: {
    display: "flex",
    gap: "5px",
  },
  starButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
  },
  submitButton: {
    padding: "12px 30px",
    fontSize: "16px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  reviewsList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  reviewItem: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  reviewUser: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  reviewDate: {
    fontSize: "14px",
    color: "#666",
  },
  reviewStars: {
    display: "flex",
  },
  reviewComment: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#333",
    margin: 0,
  },
};
