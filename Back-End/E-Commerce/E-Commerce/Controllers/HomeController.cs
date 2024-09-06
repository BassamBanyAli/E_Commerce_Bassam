using E_Commerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace E_Commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly MyDbContext _db;

        public HomeController (MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("getAllCategories")]
        public IActionResult getAllCategories()
        {
            var category = _db.Categories.ToList();

            return Ok(category);

        }
    }
}
