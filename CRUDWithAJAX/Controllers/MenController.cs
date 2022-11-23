using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CRUDWithAJAX.Data;
using CRUDWithAJAX.Models;

namespace CRUDWithAJAX.Controllers
{
    public class MenController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MenController(ApplicationDbContext context)
        {
            _context = context;
        }


        public IActionResult Search(string name) 
        {

            return Json(_context.Men.Where(m => m.Name.Contains(name)).ToList());
        }
            


        // GET: Men
        public async Task<IActionResult> PartialIndex()
        {
            var men = await _context.Men.ToListAsync();

              return Json(men);
        }
        public async Task<IActionResult> Index()
        {
            var men = await _context.Men.ToListAsync();

            return View(men);
        }

        // GET: Men/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Men == null)
            {
                return NotFound();
            }

            var men = await _context.Men
                .FirstOrDefaultAsync(m => m.Id == id);
            if (men == null)
            {
                return NotFound();
            }

            return View(men);
        }

        // GET: Men/Create
        public IActionResult Create()=> View();
        
        // POST: Men/Create
        [HttpPost]
        public async Task<IActionResult> Create(Men men)
        {
            Men add = new Men
            {
                Name = men.Name,
                Age = men.Age
            };

            _context.Men.Add(add);
            await _context.SaveChangesAsync();
            return Json(men);
        }

        // GET: Men/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Men == null)
            {
                return NotFound();
            }

            var men = await _context.Men.FindAsync(id);
            if (men == null)
            {
                return NotFound();
            }
            return View(men);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Age")] Men men)
        {
            if (id != men.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(men);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MenExists(men.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(men);
        }

        // POST: Men/Delete/5
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (_context.Men == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Men'  is null.");
            }
            var men = await _context.Men.FindAsync(id);
            if (men != null)
            {
                _context.Men.Remove(men);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MenExists(int id)
        {
          return _context.Men.Any(e => e.Id == id);
        }
    }
}
