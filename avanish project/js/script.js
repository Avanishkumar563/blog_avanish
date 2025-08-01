// Blog data storage and management
class BlogManager {
    constructor() {
        this.posts = this.loadPosts();
        this.currentView = 'home';
        this.currentPostId = null;
        this.initializeEventListeners();
    }

    // Load posts from memory with sample data
    loadPosts() {
        return [
            {
                id: this.generateId(),
                title: "Welcome to Our News Blog",
                content: "Welcome to our modern news blog! This is your first blog post, demonstrating the capabilities of our frontend-only news platform.\n\nThis blog allows you to create, read, and delete articles with a beautiful, responsive interface. All data is stored in memory during your session, making it perfect for testing and demonstration purposes.\n\nFeatures include:\n• Clean, modern design\n• Responsive layout for all devices\n• Easy article creation and management\n• Smooth animations and transitions\n• Professional typography\n\nClick 'Write Article' to create your own content and start building your news collection! You can write about current events, technology, sports, entertainment, or any topic that interests you.",
                date: new Date().toISOString(),
                excerpt: this.generateExcerpt("Welcome to our modern news blog! This is your first blog post, demonstrating the capabilities of our frontend-only news platform.")
            },
            {
                id: this.generateId(),
                title: "How to Use This News Blog Platform",
                content: "Getting started with this news blog is simple and intuitive. Here's your complete guide to using all the features:\n\n**Creating Articles**\nClick the 'Write Article' button to open the article creation form. Enter a compelling title and write your content in the text area. Your article will be published immediately when you click 'Publish Article'.\n\n**Reading Articles**\nClick on any article title from the home page to read the full content. You'll see the complete article with proper formatting and easy navigation back to the home page.\n\n**Managing Content**\nEach article has a delete option available both on the home page and in the individual article view. Be careful though - deleted articles cannot be recovered!\n\n**Design Features**\nThe blog includes modern design elements like smooth animations, hover effects, and a responsive layout that works perfectly on desktop, tablet, and mobile devices.\n\n**Data Storage**\nSince this is a frontend-only application, all your articles are stored in memory during your current session. Sample articles will always be available as a starting point.\n\nStart writing and sharing your news and stories today!",
                date: new Date(Date.now() - 86400000).toISOString(),
                excerpt: this.generateExcerpt("Getting started with this news blog is simple and intuitive. Here's your complete guide to using all the features:")
            },
            {
                id: this.generateId(),
                title: "Frontend Web Development Best Practices",
                content: "Building modern web applications requires attention to several key areas. Here are some essential best practices for frontend development:\n\n**Code Organization**\nSeparate your HTML, CSS, and JavaScript into different files. This makes your code more maintainable and easier to debug. Use meaningful folder structures and consistent naming conventions.\n\n**Responsive Design**\nAlways design mobile-first. Use CSS Grid and Flexbox for layouts, and test your applications on various screen sizes. Media queries help ensure your site looks great everywhere.\n\n**Performance Optimization**\nMinimize HTTP requests, optimize images, and use efficient CSS selectors. Consider lazy loading for images and code splitting for JavaScript applications.\n\n**Accessibility**\nInclude proper semantic HTML, alt text for images, and keyboard navigation support. Use ARIA labels where necessary and maintain good color contrast ratios.\n\n**User Experience**\nProvide clear navigation, fast loading times, and intuitive interfaces. Include loading states and error handling to keep users informed.\n\nFollowing these practices will help you build better, more professional web applications.",
                date: new Date(Date.now() - 172800000).toISOString(),
                excerpt: this.generateExcerpt("Building modern web applications requires attention to several key areas. Here are some essential best practices for frontend development:")
            }
        ];
    }

    // Initialize event listeners
    initializeEventListeners() {
        // Form submission
        const form = document.getElementById('newPostForm');
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Keyboard navigation
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    // Handle form submission
    handleFormSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        if (title.trim() && content.trim()) {
            this.addPost(title, content);
            this.showMessage('Article published successfully!', 'success');
            setTimeout(() => {
                showHome();
            }, 1000);
        } else {
            this.showMessage('Please fill in both title and content.', 'error');
        }
    }

    // Handle keyboard shortcuts
    handleKeyDown(e) {
        // Ctrl/Cmd + Home to go to home page
        if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
            e.preventDefault();
            showHome();
        }
        
        // Ctrl/Cmd + N to create new post
        if ((e.ctrlKey || e.metaKey) && e.key === 'n' && this.currentView === 'home') {
            e.preventDefault();
            showNewPostForm();
        }
        
        // Escape key to go back
        if (e.key === 'Escape') {
            if (this.currentView !== 'home') {
                showHome();
            }
        }
    }

    // Generate unique ID for posts
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Generate excerpt from content
    generateExcerpt(content, maxLength = 150) {
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Today';
        } else if (diffDays === 1) {
            return 'Yesterday';
        } else if (diffDays < 7) {
            return `${diffDays} days ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }

    // Add new post
    addPost(title, content) {
        const newPost = {
            id: this.generateId(),
            title: title.trim(),
            content: content.trim(),
            date: new Date().toISOString(),
            excerpt: this.generateExcerpt(content.trim())
        };
        
        this.posts.unshift(newPost);
        return newPost;
    }

    // Get all posts sorted by date
    getAllPosts() {
        return this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Get single post by ID
    getPost(id) {
        return this.posts.find(post => post.id === id);
    }

    // Delete post
    deletePost(id) {
        const index = this.posts.findIndex(post => post.id === id);
        if (index > -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }

    // Show message to user
    showMessage(text, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        // Insert at top of current view
        const currentView = document.querySelector('.container:not(.hidden)');
        if (currentView) {
            currentView.insertBefore(message, currentView.firstChild);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                if (message.parentNode) {
                    message.remove();
                }
            }, 3000);
        }
    }
}

// Initialize blog manager
const blog = new BlogManager();

// View management functions
function showView(viewId) {
    // Hide all views
    const views = ['homeView', 'singlePostView', 'newPostView'];
    views.forEach(view => {
        const element = document.getElementById(view);
        if (element) {
            element.classList.add('hidden');
        }
    });
    
    // Show selected view
    const selectedView = document.getElementById(viewId);
    if (selectedView) {
        selectedView.classList.remove('hidden');
    }
    
    // Update page title
    updatePageTitle(viewId);
}

function updatePageTitle(viewId) {
    const titles = {
        'homeView': 'Latest News Blog',
        'singlePostView': 'Reading Article - Latest News Blog',
        'newPostView': 'Write New Article - Latest News Blog'
    };
    
    document.title = titles[viewId] || 'Latest News Blog';
}

function showHome() {
    showView('homeView');
    renderPosts();
    blog.currentView = 'home';
    blog.currentPostId = null;
}

function showPost(postId) {
    const post = blog.getPost(postId);
    if (post) {
        renderSinglePost(post);
        showView('singlePostView');
        blog.currentView = 'post';
        blog.currentPostId = postId;
    }
}

function showNewPostForm() {
    showView('newPostView');
    const form = document.getElementById('newPostForm');
    if (form) {
        form.reset();
    }
    blog.currentView = 'newPost';
    
    // Focus on title input
    const titleInput = document.getElementById('title');
    if (titleInput) {
        setTimeout(() => titleInput.focus(), 100);
    }
}

// Render functions
function renderPosts() {
    const posts = blog.getAllPosts();
    const container = document.getElementById('postsContainer');
    const noPostsMessage = document.getElementById('noPostsMessage');

    if (!container || !noPostsMessage) return;

    if (posts.length === 0) {
        container.innerHTML = '';
        noPostsMessage.classList.remove('hidden');
        return;
    }

    noPostsMessage.classList.add('hidden');
    
    container.innerHTML = posts.map((post, index) => `
        <article class="post-card" style="animation-delay: ${index * 0.1}s">
            <div class="post-header">
                <h2 onclick="showPost('${post.id}')">${escapeHtml(post.title)}</h2>
                <span class="post-date">📅 ${blog.formatDate(post.date)}</span>
            </div>
            <div class="post-excerpt">
                <p>${escapeHtml(post.excerpt)}</p>
            </div>
            <div class="post-actions">
                <button class="btn btn-secondary" onclick="showPost('${post.id}')">Read More</button>
                <button class="btn btn-danger" onclick="deletePost('${post.id}')">Delete</button>
            </div>
        </article>
    `).join('');
}

function renderSinglePost(post) {
    const container = document.getElementById('singlePostContent');
    if (!container) return;
    
    const paragraphs = post.content.split('\n')
        .filter(p => p.trim())
        .map(p => `<p>${escapeHtml(p)}</p>`)
        .join('');
    
    container.innerHTML = `
        <header class="post-header">
            <h1>${escapeHtml(post.title)}</h1>
            <div class="post-meta">
                <span class="post-date">📅 ${blog.formatDate(post.date)}</span>
            </div>
        </header>
        
        <div class="post-content">
            ${paragraphs}
        </div>
        
        <div class="post-actions">
            <button class="btn btn-secondary" onclick="showHome()">← Back to Home</button>
            <button class="btn btn-danger" onclick="deletePost('${post.id}')">Delete Article</button>
        </div>
    `;
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
        if (blog.deletePost(postId)) {
            blog.showMessage('Article deleted successfully!', 'success');
            
            if (blog.currentView === 'post' && blog.currentPostId === postId) {
                setTimeout(() => showHome(), 500);
            } else {
                renderPosts();
            }
        } else {
            blog.showMessage('Error deleting article. Please try again.', 'error');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('News Blog initialized successfully!');
    showHome();
    
    // Add some keyboard shortcut hints
    console.log('Keyboard shortcuts:');
    console.log('- Ctrl/Cmd + Home: Go to home page');
    console.log('- Ctrl/Cmd + N: Create new post (on home page)');
    console.log('- Escape: Go back to home page');
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function(e) {
    showHome();
});