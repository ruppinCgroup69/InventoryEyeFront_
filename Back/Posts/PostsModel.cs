using InventoryEyeBack.Posts;
using InventoryEyeBack.Users;
using Microsoft.Extensions.Hosting;
using System.Net;

namespace InventoryEyeBack.Posts
{
    public class PostsModel
    {
        int postId;
        int userId;
        string userName;
        string userImage;
        DateTime createAt;
        DateTime editedAt;
        string productName;
        string content;
        string image;
        string tags;
        int category;
        string pickUpFromUser;
        double pickUpLat;
        double picUpLng;
        string pickUpAddress;
        string categoryDesc;
        int score;

        public PostsModel(int postId, int userId, DateTime createAt, DateTime editedAt, string productName, string content, string image, string tags, int category, string pickUpFromUser, double pickUpLat, double picUpLng, string pickUpAddress)
        {
            PostId = postId;
            UserId = userId;
            CreateAt = createAt;
            EditedAt = editedAt;
            ProductName = productName;
            Content = content;
            Image = image;
            Tags = tags;
            Category = category;
            PickUpFromUser = pickUpFromUser;
            PickUpLat = pickUpLat;
            PicUpLng = picUpLng;
            PickUpAddress = pickUpAddress;
        }

        public PostsModel() { }

        public int PostId { get => postId; set => postId = value; }
        public int UserId { get => userId; set => userId = value; }
        public string UserName { get => userName; set => userName = value; }
        public string UserImage { get => userImage; set => userImage = value; }
        public DateTime CreateAt { get => createAt; set => createAt = value; }
        public DateTime EditedAt { get => editedAt; set => editedAt = value; }
        public string ProductName { get => productName; set => productName = value; }
        public string Content { get => content; set => content = value; }
        public string Image { get => image; set => image = value; }
        public string Tags { get => tags; set => tags = value; }
        public int Category { get => category; set => category = value; }
        public string PickUpFromUser { get => pickUpFromUser; set => pickUpFromUser = value; }
        public double PickUpLat { get => pickUpLat; set => pickUpLat = value; }
        public double PicUpLng { get => picUpLng; set => picUpLng = value; }
        public string PickUpAddress { get => pickUpAddress; set => pickUpAddress = value; }
        public string CategoryDesc { get => categoryDesc; set => categoryDesc = value; }
        public int Score { get => score; set => score = value; }

        public int InsertPost(PostsModel post)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.InsertPostDBS(post);
        }

        public int UpdatePost(PostsModel post)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.UpdatePostDBS(post);
        }

        public int DeletePost(int postId)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.DeletePostDBS(postId);
        }


        public List<PostsModel> ReadAllPosts()
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.ReadAllPostsDBS();
        }

        public PostsModel ReadPostByPostId(int id)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.ReadPostByPostIdDBS(id);
        }

        public List<PostsModel> ReadPostByCategory(int category)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.ReadPostByCategoryDBS(category);
        }


        public List<PostsModel> ReadPostByUserId(int userId)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.ReadPostByUserIdDBS(userId);
        }

        public List<PostsModel> SearchPostsBySearch(string search)
        {
            PostsDBS dbs = new PostsDBS();
            return dbs.SearchPostsBySearchDBS(search);
        }










    }
}
